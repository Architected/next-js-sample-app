// import nc from 'next-connect';
// import backChannelService from '../../../service/backChannelService';

// const handler = nc();

// handler.post(async (req, res) => {
//   try {
//     console.log('starting calling backChannelService.wallet.createWallet');
//     const response = await backChannelService().wallet().createWallet(req.body);

//     res.send(response.data);
//   } catch (err) {
//     console.log('error calling backChannelService.wallet.createWallet');
//     res.status(500).send(unexpectedError(err));
//   }
// });
// export default handler;
