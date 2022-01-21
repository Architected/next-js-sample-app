// import nc from 'next-connect';
// import backChannelService from '../../../service/backChannelService';

// const handler = nc();

// handler.post(async (req, res) => {
//   try {
//     console.log('starting calling backChannelService.wallet.getWallet');
//     const response = await backChannelService().wallet().getWallet(req.body);

//     res.send(response.data);
//   } catch (err) {
//     console.log('error calling backChannelService.wallet.getWallet');
//     res.status(500).send(unexpectedError(err));
//   }
// });

// export default handler;
