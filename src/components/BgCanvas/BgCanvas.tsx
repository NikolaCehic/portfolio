import { useCanvasBg } from '../../hooks/useCanvasBg';

export function BgCanvas() {
  const ref = useCanvasBg();
  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
}
