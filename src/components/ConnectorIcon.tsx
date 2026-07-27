import { connectors, type Connector } from '@/data/connectors';

/**
 * Icon path data cache: loaded from simple-icons at module level.
 * For connectors not in simple-icons (Slack, Outlook, Teams),
 * we fall back to customSvgPath in the connector data.
 */
function getIconPath(connector: Connector): string {
  if (connector.customSvgPath) {
    return connector.customSvgPath;
  }

  if (connector.simpleIconKey) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const icons = require('simple-icons');
    const icon = icons[connector.simpleIconKey];
    if (icon) {
      return icon.path;
    }
  }

  return '';
}

interface ConnectorIconProps {
  slug: string;
  className?: string;
  size?: number;
}

export default function ConnectorIcon({
  slug,
  className = '',
  size = 24,
}: ConnectorIconProps) {
  const connector = connectors.find((c) => c.slug === slug);
  if (!connector) return null;

  const path = getIconPath(connector);
  if (!path) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      role="img"
      aria-label={`${connector.name} icon`}
    >
      <path d={path} />
    </svg>
  );
}
