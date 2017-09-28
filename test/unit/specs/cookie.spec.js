import $ from 'cookie'
describe('cookies测试', () => {
  it('cookie应该存进去', () => {
    $.cookie('test', 'nihao')
    expect($.cookie('test')).to.be.equal('nihao')
  })
  it('test被移除', () => {
    expect($.removeCookie('test')).to.be.true
  })
  it('test移除成功', () => {
    expect($.cookie('test')).to.be.an('undefined')
  })
})

