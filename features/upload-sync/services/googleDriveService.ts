/// <reference types="vite/client" />
/// <reference types="vite/client" />

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

let tokenClient: any;
let isInitialized = false;

// Initialize ONLY the Google Identity Services (GIS) script for Auth
export const initGoogleDrive = async () => {
    if (isInitialized) return;

    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            try {
                // @ts-ignore
                tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    scope: SCOPES,
                    callback: '', // defined at request time
                });
                isInitialized = true;
                resolve();
            } catch (err) {
                reject(err);
            }
        };
        script.onerror = (e) => reject(e);
        document.body.appendChild(script);
    });
};

export const connectToDrive = async (): Promise<string> => {
    if (!tokenClient) await initGoogleDrive();
    
    return new Promise((resolve, reject) => {
        tokenClient.callback = (resp: any) => {
            if (resp.error) {
                reject(resp);
            }
            resolve(resp.access_token);
        };
        // Trigger the popup
        tokenClient.requestAccessToken({ prompt: 'consent' });
    });
};

// ... (connectToDrive above)

// New interface for User Info
export interface GoogleUserInfo {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
}

export const getUserInfo = async (accessToken: string): Promise<GoogleUserInfo> => {
    const response = await fetch('https://www.googleapis.com/drive/v3/about?fields=user(displayName,emailAddress,photoLink)', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    return data.user as GoogleUserInfo;
};

export interface DriveFile {
// ...
    id: string;
    name: string;
    thumbnailLink?: string;
    mimeType: string;
    webViewLink?: string;
}

// Now uses direct fetch with the accessToken, bypassing flaky gapi.client
export const listDriveFiles = async (accessToken: string): Promise<DriveFile[]> => {
    const params = new URLSearchParams({
        pageSize: '100',
        orderBy: 'modifiedTime desc',
        fields: 'files(id, name, thumbnailLink, mimeType, webViewLink)',
        q: "mimeType contains 'image/' and trashed = false"
    });

    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Error listing files", error);
        throw new Error(error.error?.message || 'Failed to list drive files');
    }

    const data = await response.json();
    return data.files as DriveFile[];
};

export const downloadDriveFile = async (fileId: string, accessToken: string): Promise<Blob> => {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if (!response.ok) {
         throw new Error('Failed to download file');
    }
    
    return await response.blob();
};
