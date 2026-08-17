export default function BrandMark({ className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-aspect brand mark, sized in rem to track the site's adaptive root font-size
    <img src="/acentics-logo.png" alt="Acentics" className={className} />
  );
}
