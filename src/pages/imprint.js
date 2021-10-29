import Container from 'features/imprint/imprint-page-container.js';
import { page } from 'hocs';
import withTexts from 'hocs/with-texts';
import withTitle from 'hocs/with-title';

export default page(withTitle, withTexts)(Container);
