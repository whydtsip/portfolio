import { portfolio } from "@/data/portfolio";
import { ChannelIcon, type IconName } from "./ContactMenu";

const BRAND_BG: Record<IconName, string> = {
  gmail: "linear-gradient(135deg,#ff7a59,#ea4335)",
  sms: "linear-gradient(135deg,#34e0a1,#12b886)",
  facebook: "linear-gradient(135deg,#5b93ff,#1877f2)",
  instagram: "linear-gradient(135deg,#f9ce34,#ee2a7b 55%,#6228d7)",
  telegram: "linear-gradient(135deg,#6fd0f7,#26a5e4)",
  linkedin: "linear-gradient(135deg,#3fa1ee,#0a66c2)",
  github: "linear-gradient(135deg,#4b5561,#14171b)",
};

export default function SocialCircles() {
  const channels = portfolio.contactChannels.filter((channel) => channel.href);

  return (
    <div className="social-circles" role="list">
      {channels.map((channel, index) => (
        <a
          key={channel.id}
          role="listitem"
          className="social-circle"
          href={channel.href}
          target={channel.external ? "_blank" : undefined}
          rel={channel.external ? "noreferrer" : undefined}
          aria-label={channel.label}
          title={channel.label}
          style={{
            "--circle-bg": BRAND_BG[channel.id as IconName] ?? "var(--accent)",
            "--i": index,
          } as React.CSSProperties}
        >
          <ChannelIcon name={channel.id as IconName} />
        </a>
      ))}
    </div>
  );
}
