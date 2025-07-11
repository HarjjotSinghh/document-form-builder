'use server';

import { DocumentTemplate } from "@/components/form-builder/types";
import { MimeTypeEnum } from "@/components/form-builder/enums";

// Placeholder function to simulate creating a global document template
export async function createGlobalDocumentTemplate(data: DocumentTemplate): Promise<{ success: boolean; template: DocumentTemplate }> {
  // Mock result: return the input data with a fake id and other mock fields
  const mockTemplate: DocumentTemplate = {
    ...data,
    id: BigInt(123456),
    createdAt: new Date(),
    updatedAt: new Date(),
    hash: "mockhash123",
    fileSize: BigInt(1024),
    storageLocation: "/mock/location",
    status: "ACTIVE",
    isActive: true,
    mimeType: MimeTypeEnum["application/pdf"],
    metadata: {},
    tags: ["mock", "template"],
    language: "en",
    isPublic: true,
    createdBy: BigInt(1),
    updatedBy: BigInt(1),
  };
  return {
    success: true,
    template: mockTemplate,
  };
}

// Placeholder function to simulate updating a global document template
export async function updateGlobalDocumentTemplate(id: string, data: Partial<DocumentTemplate>): Promise<{ success: boolean; updated: DocumentTemplate }> {
  // Mock result: return the updated data merged with a mock template
  const mockUpdatedTemplate: DocumentTemplate = {
    id: BigInt(id),
    name: data.name ?? "Updated Template",
    description: data.description ?? "Mock updated description",
    hash: data.hash ?? "updatedmockhash456",
    content: data.content ?? {},
    fields: data.fields ?? [],
    category: data.category ?? "General",
    version: data.version ?? "1.0.1",
    status: data.status ?? "ACTIVE",
    isActive: data.isActive ?? true,
    metadata: data.metadata ?? {},
    mimeType: data.mimeType ?? MimeTypeEnum["application/pdf"],
    fileSize: data.fileSize ?? BigInt(2048),
    storageLocation: data.storageLocation ?? "/mock/updated/location",
    tags: data.tags ?? ["updated", "template"],
    language: data.language ?? "en",
    isPublic: data.isPublic ?? true,
    createdBy: data.createdBy ?? BigInt(1),
    updatedBy: data.updatedBy ?? BigInt(2),
    createdAt: data.createdAt ?? new Date(),
    updatedAt: new Date(),
  };
  return {
    success: true,
    updated: mockUpdatedTemplate,
  };
}