import tok_axios from '../utils/tok_axios'

export async function getPrice(ctx) {
  let params = { "symbol": ctx.params.symbol }
  console.log('param:', params);

  await tok_axios.service.get(tok_axios.TICKER_URL, {params: params})
    .then(function (response) {
      if (response.status == 200) {
          console.log(response.data);
          if (response.data.code == 0) {
            let symbol = response.data.data.symbol
            let open = parseFloat(response.data.data.data.open)
            let last_price = parseFloat(response.data.data.data.last_price)
            let high = parseFloat(response.data.data.data.high)
            let low = parseFloat(response.data.data.data.low)
            let volume = parseFloat(response.data.data.data.volume)
            let daily_vol = parseFloat(response.data.data.data.daily_vol)
            let daily_change = parseFloat(response.data.data.data.daily_change)

            let _result = {
                'error_code': 0,
                'error_msg': '',
                data: {
                    'symbol': symbol,
                    'open': open,
                    'last_price': last_price,
                    'high': high,
                    'low': low,
                    'volume': volume,
                    'daily_vol': daily_vol,
                    'daily_change': daily_change,
                }
            }
            ctx.response.body = _result

          } else {
            ctx.response.body = {
                'error_code': -1,
                'error_msg': 'error return value!',
                data: response.data
            }
          }
      } else {
        ctx.response.body = {
          'error_code': -1,
          'error_msg': 'wrong status code',
        }
      }
    })
    .catch(function (error) {
      ctx.response.body = {
        'error_code': -1,
        'error_msg': error
      }
    });
}