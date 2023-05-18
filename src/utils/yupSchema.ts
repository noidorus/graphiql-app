import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import i18n from 'i18next';

const schema = Yup.object().shape({
  email: Yup.string()
    .required(i18n.t('validation.required') || '')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, i18n.t('validation.email') || ''),
  password: Yup.string()
    .required(i18n.t('validation.required') || '')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}$/,
      i18n.t('validation.password') || ''
    ),
});

export type schemaType = Yup.InferType<typeof schema>;

const resolver = yupResolver(schema);

export default resolver;
