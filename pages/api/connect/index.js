import nc from 'next-connect';
import { unexpectedError } from 'architected-client/helper/unexpectedError.js';
import { connectService } from '../../../service/defaultServices.js';

const handler = nc();

handler.post(async (req, res) => {
  try {
    console.log('starting calling connectService.authorize');
    const authorizeResponse = await connectService.authorize(req.body);
    console.log('connectService.authorize:finish');
    res.send(authorizeResponse.data);
  } catch (err) {
    console.log('error calling connectService.authorize');
    res.status(500).send(unexpectedError(err));
  }
});

export default handler;
