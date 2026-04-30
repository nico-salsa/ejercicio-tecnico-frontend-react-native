export function isRemoteLogo(logo: string): boolean {
  return /^https?:\/\//i.test(logo);
}
