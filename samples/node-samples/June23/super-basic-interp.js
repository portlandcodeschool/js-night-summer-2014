var compiled = interpolate('I was walking along and then someone said @\n\
                            And all of a sudden, I heard again, @\n\
                            @ @ @ @ @ @ @ @ @!!!!!!!', 'booyah!');

console.log(compiled);

function interpolate(str, data) {
  return str.replace(/@/g, data);
}
