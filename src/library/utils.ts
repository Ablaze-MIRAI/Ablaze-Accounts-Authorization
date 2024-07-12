export const withContinue = (default_uri: string, continue_uri: string | undefined | null = undefined) =>
  continue_uri ? `${default_uri}?continue=${encodeURIComponent(continue_uri)}` : default_uri;
