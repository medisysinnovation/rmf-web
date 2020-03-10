import * as svgToMiniDataURI from 'mini-svg-data-uri';
import * as pako from 'pako';

export enum ProcessRawCompressedSvgMode {
  SVGSVGElement,
  DataUri,
}

export function copy<T>(obj: T): T {
  return { ...obj };
}

export function rawCompressedSVGToSVGSVGElement(data: ArrayBuffer | Uint8Array) {
  if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data);
  }

  const inflated = pako.inflate(data as Uint8Array);
  const inflatedText: string = new TextDecoder('utf-8').decode(inflated);

  const svgDoc: XMLDocument = new DOMParser().parseFromString(inflatedText, 'image/svg+xml');

  return (svgDoc.documentElement as any) as SVGSVGElement;
}

export function toBlobUrl(data: Uint8Array) {
  const blob = new Blob([data]);
  return URL.createObjectURL(blob);
}

export function SVGSVGElementToDataURI(element: SVGSVGElement) {
  // FIXME: Type
  return (svgToMiniDataURI as any)(new XMLSerializer().serializeToString(element));
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!,
      );
    });
  });
}
