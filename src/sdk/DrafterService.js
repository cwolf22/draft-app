import DrafterAPI from '@/sdk/DrafterAPI';

export default () => {
  const services = {
    drafterAPI: new DrafterAPI(),
  };
  return services;
};
