export default interface IImageProps {
    image: File | string,
    allowZoomOut: boolean,
    position: {x: number, y: number},
    scale: number,
    borderRadius: number,
    width: number,
    height: number
}