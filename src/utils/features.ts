export const features = {
  sounds: true,
  introWave: true,
  startProject: true,
  sleepingSprite: false,
} as const;

export const isFeatureEnabled = (feature: keyof typeof features) => {
  return features[feature];
};
