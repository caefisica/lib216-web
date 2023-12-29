import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
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
