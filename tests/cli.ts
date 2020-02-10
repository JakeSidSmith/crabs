describe('cli', () => {
  it('should log a message', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

    require('../src/cli');

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Hello, World!');

    logSpy.mockRestore();
  });
});
