declare module 'opentype.js' {
  /* --- single drawing command ---------------------------------- */
  export interface Command {
    type: 'M' | 'L' | 'C' | 'Q' | 'Z';
    x?: number;
    y?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
  }

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
      /** all drawing commands in order */
      commands: Command[];

      toPathData(precision?: number): string;

      getBoundingBox(): {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
      };
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
