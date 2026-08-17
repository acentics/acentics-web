/** @type {import('next').NextConfig} */
const nextConfig = {
  // This page drives a hand-rolled rAF spring engine, IntersectionObservers,
  // and imperative DOM setup (loader timers, Lenis, carousels) from a single
  // effect. Strict Mode's dev-only double-invoke (mount -> cleanup -> mount)
  // fights that model, so it's turned off here.
  reactStrictMode: false,
};

export default nextConfig;
