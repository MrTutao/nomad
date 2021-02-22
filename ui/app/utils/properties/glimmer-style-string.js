import { htmlSafe } from '@ember/template';

export default function styleString(target, name, descriptor) {
  if (!descriptor.get) throw new Error('styleString only works on getters');
  const orig = descriptor.get;
  descriptor.get = function() {
    const styles = orig.apply(this);

    let str = '';

    if (styles) {
      str = Object.keys(styles)
        .reduce(function(arr, key) {
          const val = styles[key];
          arr.push(key + ':' + (typeof val === 'number' ? val.toFixed(2) + 'px' : val));
          return arr;
        }, [])
        .join(';');
    }

    return htmlSafe(str);
  };
  return descriptor;
}
