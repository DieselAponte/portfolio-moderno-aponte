"use server";

import { getSupabaseClient } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/admin-auth";

const BUCKET_NAME = "portfolio-assets";

export async function uploadStorageAsset(formData: FormData): Promise<string> {
    await checkAdminAuth();
    
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;
    const filename = formData.get("filename") as string;

    if (!file || !folder || !filename) {
        throw new Error("Missing required form data: file, folder, or filename");
    }

    const supabase = getSupabaseClient();
    const filePath = `${folder}/${filename}`;

    // Convert file to array buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
            upsert: true,
            contentType: file.type,
        });

    if (error) {
        throw new Error(`Failed to upload to storage: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}

export async function deleteStorageAsset(path: string): Promise<void> {
    await checkAdminAuth();
    const supabase = getSupabaseClient();

    let relativePath = path;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const bucketUrlPrefix = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`;
    
    if (path.startsWith(bucketUrlPrefix)) {
        relativePath = path.replace(bucketUrlPrefix, "");
    }

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([relativePath]);

    if (error) {
        console.error("Failed to delete storage asset:", error.message);
        throw new Error(`Failed to delete storage asset: ${error.message}`);
    }
}
