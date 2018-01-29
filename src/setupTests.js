import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import JestFetchMock from 'jest-fetch-mock';

global.fetch = JestFetchMock;

configure({ adapter: new Adapter() });
