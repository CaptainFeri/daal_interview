export function sendOtpSms(receptor: string, token: string): Promise<any> {
  var Kavenegar = require('kavenegar');
  var api = Kavenegar.KavenegarApi({
    apikey:
      '6B4671684B636B5231322F4362547A4876444B6A48647A4E324C654B557A6F35707952442B6542376A526F3D',
  });
  return new Promise((resolve, reject) => {
    api.VerifyLookup(
      {
        receptor: receptor,
        token: token,
        template: 'myotp',
      },
      function (response, status) {
        // return({response,status})
        resolve({ response, status });
      },
    );
  });
}

export function sendKavenegarSms(
  receptor: string,
  token: string,
  token2: string,
  token3: string,
  template: string,
): Promise<any> {
  const Kavenegar = require('kavenegar');
  const api = Kavenegar.KavenegarApi({
    apikey:
      '6B4671684B636B5231322F4362547A4876444B6A48647A4E324C654B557A6F35707952442B6542376A526F3D',
  });
  return new Promise((resolve, reject) => {
    api.VerifyLookup(
      {
        receptor: receptor,
        token: token,
        token2: token2,
        token3: token3,
        template: template,
        // $type = "sms";//sms | call
      },
      function (response, status) {
        // return({response,status})
        resolve({ response, status });
      },
    );
  });
}
