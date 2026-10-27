export default function TileBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`tile-border-container ${className}`} aria-hidden="true">
      <div className="tile-border-strip" />
    </div>
  );
}
