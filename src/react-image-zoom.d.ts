declare module 'react-image-zoom' {
    interface ReactImageZoomProps {
      width: number;
      height: number;
      zoomWidth: number;
      img: string;
      zoomStyle?: string;
      offset?: { vertical: number; horizontal: number };
      zoomPosition?: string;
      zoomLensStyle?: string;
      zoomLensSize?: number;
    }
  
    export default function ReactImageZoom(props: ReactImageZoomProps): JSX.Element;
  }
  