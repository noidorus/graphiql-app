import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Required field!')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Write correct email!'),
  password: Yup.string()
    .required('Required field!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}$/,
      'Min 8 symbols, one letter, one digit, one special character!'
    ),
});

export type schemaType = Yup.InferType<typeof schema>;

const resolver = yupResolver(schema);

export default resolver;
