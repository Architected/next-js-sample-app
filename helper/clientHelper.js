import publicIp from 'public-ip';

export const getClientDetails = async () => {
  const ipAddress = await publicIp.v4();
  const userAgent = window.navigator.userAgent;

  return {
    ipAddress: ipAddress,
    userAgent: userAgent,
  };
};
