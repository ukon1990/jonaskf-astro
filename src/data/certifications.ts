export type Certification = {
  name: string;
  issuer: string;
  issuedAt: string;
  expiresAt?: string;
  verificationId?: string;
  verificationUrl?: string;
};

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services (AWS)',
    issuedAt: '2019-08-01',
    expiresAt: '2022-08-01',
    verificationId: 'XWDES6S2MBB410GN',
    verificationUrl: 'https://cp.certmetrics.com/amazon/en/public/verify/credential',
  },
];
