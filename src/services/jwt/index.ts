import { Jwt } from './Jwt';

export const jwt = new Jwt({ secret: `c*GkDFJ6vk&,TFI`, signOptions: { expiresIn: '10600 s' }, });