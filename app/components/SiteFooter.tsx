import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Un proyecto del{' '}
          <a
            href={siteConfig.links.facebook}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @caefisica
          </a>
          . También puedes visitarnos en{' '}
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Instagram
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
