import { shallow, render, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import raf from './tempPolyfills'

configure({ adapter: new Adapter() })


global.shallow = shallow
global.render = render
global.mount = mount
//global.toJson = toJson

// Fail tests on any warning
console.error = message => {
    throw new Error(message)
}