declare module 'opentype.js' {
  export interface Font {
    unitsPerEm: number;
    ascender: number;
    descender: number;
    getPath: (
      text: string,
      x: number,
      y: number,
      fontSize?: number,
    ) => {
      toPathData(precision?: number): string;
    };
  }

  const opentype: {
    load: (
      url: string,
      callback: (err: Error | null, font: Font) => void,
    ) => void;

    parse: (buffer: ArrayBuffer | Uint8Array) => Font;
  };

  export default opentype;
}
