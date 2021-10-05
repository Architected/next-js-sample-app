import nc from 'next-connect';
import { unexpectedError } from '../../../helper/unexpectedError';
import connectInit from '../../../service/connectInit';

const handler = nc();

handler.post(async (req, res) => {
  try {
    console.log('starting calling connectService.authorize');
    const connectService = connectInit();
    const authorizeResponse = await connectService.authorize(req.body);
    console.log(
      'authorizeResponse.data' + JSON.stringify(authorizeResponse.data)
    );
    res.send(authorizeResponse.data);
  } catch (err) {
    console.log('error calling connectService.authorize');
    res.status(500).send(unexpectedError(err));
  }
});

export default handler;
