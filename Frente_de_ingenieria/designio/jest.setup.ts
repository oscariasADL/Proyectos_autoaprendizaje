global.Blob = class {
  public parts: BlobPart[];
  public type: string;

  constructor(parts: BlobPart[] = [], options: { type?: string } = {}) {
    this.parts = parts;
    this.type = options.type || "";
  }
} as any;

global.File = class extends Blob {
  constructor(
    fileBits: BlobPart[],
    fileName: string,
    options?: { lastModified?: number; type?: string },
  ) {
    super(fileBits, { type: options?.type });
    Object.defineProperty(this, "name", { value: fileName, writable: false });
    Object.defineProperty(this, "lastModified", {
      value: options?.lastModified ?? Date.now(),
      writable: false,
    });
  }
} as any;
