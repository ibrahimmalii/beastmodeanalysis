import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-filter-and-search',
  templateUrl: './filter-and-search.component.html',
  styleUrls: ['./filter-and-search.component.css'],
})
export class FilterAndSearchComponent implements OnInit {
  chart!: Chart;
  charttwo!: Chart;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private requestService: RequestService
  ) {}
  products = [];
  symbols: any;
  someSymbols: any;
  searchResult: any;
  firstLoading: boolean = false;
  loaderStarted: boolean = false;

  public articles: any[] = [];
  public view: any[] = [];

  isPageLoaded: boolean = false;
  isResponseGet: boolean = false;
  getPriceData: any;
  responseData: any;
  financials: any;
  data: any;
  apiRequest: any;
  names: any;
  searchData: any;
  associatedArr: any;
  symbol: any;
  name: any;
  country: any;

  netIncomeMarginDone: any;

  // Best Mode
  PE: any;
  PS: any;
  maps: any;
  collect: any;
  fixed: any;
  dataQuart: any;
  operatingMargin: any;
  netIncomeMargin: any;
  totalLibilites: any;
  totalAssets: any;
  total: any;
  revenueGrowthIncrease: any;
  revenueGrowth: any;
  calculater: any;
  roeMedian: any;
  roce: any;
  roceFixed: any;
  flowPerShare: any;
  flowPerShareFixed: any;
  price: any;
  marketCap: any;
  marketCapFixed: any;
  industry: any;
  currency: any;
  revenue_per_share: any;
  ebitda_per_share: any;
  operating_income_per_share: any;
  pretax_income_per_share: any;
  revenueRatio: any;
  dividends_quarterly: any;
  dividendsFixed: any;
  deptToEquity: any;
  deptToEquityFixed: any;
  total_revenue: any;
  ev: any;
  qfs_symbol: any;
  roeOne: any;
  roceOne: any;
  revenue_growthDone: any;
  flowPerShareDone: any;
  // dividends: any
  revenuePerShareRatio: any;
  ebidtaPerShareRatio: any;

  // One
  PB: any;
  enterprise_value_to_sales: any;
  enterprise_value_to_pretax_income: any;
  enterprise_value_to_fcf: any;
  roa_median: any;
  roe_median: any;
  roic_median: any;
  revenue_cagr_10: any;
  total_assets_cagr_10: any;
  fcf_cagr_10: any;
  eps_diluted_cagr_10: any;
  gross_margin_median: any;
  pretax_margin_median: any;
  fcf_margin_median: any;
  debt_to_assets_median: any;
  debt_to_equity_median: any;
  assets_to_equity_median: any;
  enterprise_value_to_earnings: any;
  ruleOf40: any;
  fcf_margin: any;
  ruleOf40Done: any;
  jerry: any;
  jerryDone: any;

  revenue_growthCopy: any;
  roeCopy: any;

  // Two
  revenue: any;
  revenue_growth: any;
  gross_profit: any;
  gross_margin: any;
  operating_income: any;
  operating_margin: any;
  eps_diluted_growth: any;
  dividends: any;
  roa: any;
  roe: any;
  roic: any;
  eps_diluted: any;
  dividends_per_share_growth: any;
  dividend_yield: any;

  bvRatio: any;
  isLoginError: boolean = false;

  // Cahrts Data
  chartData: any;

  oparator(op: any, arr: any) {
    let result = eval(arr?.join(op));
    let fixedResult = result?.toFixed(2) + '%';
    return fixedResult;
  }



  ngOnInit(): void {
    let searchKey = localStorage.latestSearchKey;
    if (searchKey) {
      this.getData('', searchKey);
    }
  }



  init() {
    this.chart = new Chart({
      rangeSelector: {
        selected: 1,
      },
      chart: {
        type: 'line',
      },
      title: {
        text: 'Return On Invested Capital',
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          data: [
            [2011, this.roic[0]],
            [2012, this.roic[1]],
            [2013, this.roic[2]],
            [2014, this.roic[3]],
            [2015, this.roic[4]],
            [2016, this.roic[5]],
            [2018, this.roic[6]],
            [2019, this.roic[7]],
            [2020, this.roic[8]],
            // [2021, this.roic[9]]
          ],
          type: 'spline',
        },
      ],
    });
  }

  inittwo() {
    this.charttwo = new Chart({
      rangeSelector: {
        selected: 1,
      },
      chart: {
        type: 'line',
      },
      title: {
        text: 'Return On Equity',
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          data: [
            [2012, this.roe[0]],
            [2013, this.roe[1]],
            [2014, this.roe[2]],
            [2015, this.roe[3]],
            [2016, this.roe[4]],
            [2017, this.roe[5]],
            [2018, this.roe[6]],
            [2019, this.roe[7]],
            [2020, this.roe[8]],
            [2021, this.roe[9]]
          ],
          type: 'spline',
        },
      ],
    });
  }

  splicedArray(arr: any) {
    if (!arr) {
    } else if (arr.length >= 10) {
      return arr.slice(-10);
    }

    let missingNumbers = 10 - arr?.length;
    for (let i = 0; i < missingNumbers; i++) {
      arr.unshift(0);
    }
    return arr;
  }

  //=====================> Request Service To Get Data. =========================//

  callDataBase(searchKey: string) {
    if (!searchKey.includes(':')) {
      searchKey = searchKey + ':US';
    }
    return this.apiService.get(
      `${environment.baseUrl}/api/keyStatistics/${searchKey.toUpperCase()}`,
      { headers: { Authorization: this.userService.getToken() } }
    );
  }

  callApiAfterDataBase(searchKey: string) {
    return this.apiService.get(
      `https://public-api.quickfs.net/v1/data/all-data/${searchKey.toUpperCase()}?api_key=8efcfb97fcb6b39a887149f058b54f1940ccdbb8`
    );
  }

  getPriceDataFromItsApi(searchKey: any) {
    if (searchKey.includes(':')) {
      searchKey = searchKey.substring(searchKey.indexOf(':') + 1);
    } else {
      searchKey = 'US';
    }
    return this.apiService.get(
      `https://public-api.quickfs.net/v1/market-data/last-close/${searchKey}?api_key=8efcfb97fcb6b39a887149f058b54f1940ccdbb8`
    );
  }

  storeDataFromApiToDataBase(data: any) {
    this.data = data;

    // If Company Exist
    // Start Of Send Requests
    this.apiRequest = this.requestService.data;

    this.apiRequest.price = this.data.price;
    this.apiRequest.volume = this.data.volume;
    this.apiRequest.ev = this.data.ev;
    this.apiRequest.market_cap = this.data.market_cap;
    this.apiRequest.pe_ratio = this.data.pe_ratio;
    this.apiRequest.ps_ratio = this.data.ps_ratio;
    this.apiRequest.pb_ratio = this.data.pb_ratio;
    this.apiRequest.avg_vol_50d = this.data.avg_vol_50d;

    this.apiRequest.name = this.data?.data?.metadata.name;
    this.apiRequest.description = this.data?.data?.metadata.description;
    this.apiRequest.country = this.data?.data?.metadata.country;
    this.apiRequest.symbol = this.data?.data?.metadata.symbol;
    this.apiRequest.exchange = this.data?.data?.metadata.exchange;
    this.apiRequest.industry = this.data?.data?.metadata.industry;
    this.apiRequest.sector = this.data?.data?.metadata.sector;
    this.apiRequest.qfs_symbol = this.data?.data?.metadata.qfs_symbol;
    this.apiRequest.enterprise_value =
      this.data.data.financials.annual.enterprise_value;
    this.apiRequest.cogs = this.data.data.financials.annual.cogs;
    this.apiRequest.gross_profit =
      this.data.data.financials.annual.gross_profit;
    this.apiRequest.total_opex = this.data.data.financials.annual.total_opex;
    this.apiRequest.operating_margin =
      this.data.data.financials.annual.operating_margin;
    this.apiRequest.operating_income =
      this.data.data.financials.annual.operating_income;
    this.apiRequest.pretax_income =
      this.data.data.financials.annual.pretax_income;
    this.apiRequest.net_income = this.data.data.financials.annual.net_income;
    this.apiRequest.net_income_margin =
      this.data.data.financials.annual.net_income_margin;
    this.apiRequest.total_current_assets =
      this.data.data.financials.annual.total_current_assets;
    this.apiRequest.total_current_liabilities =
      this.data.data.financials.annual.total_current_liabilities;
    this.apiRequest.total_assets =
      this.data.data.financials.annual.total_assets;
    this.apiRequest.total_liabilities =
      this.data.data.financials.annual.total_liabilities;
    this.apiRequest.revenue_growth =
      this.data.data.financials.annual.revenue_growth;
    this.apiRequest.fcf_margin = this.data.data.financials.annual.fcf_margin;
    this.apiRequest.roe = this.data.data.financials.annual.roe;
    this.apiRequest.roa = this.data.data.financials.annual.roa;
    this.apiRequest.roic = this.data.data.financials.annual.roic;
    this.apiRequest.roce = this.data.data.financials.annual.roce;
    this.apiRequest.rotce = this.data.data.financials.annual.rotce;
    this.apiRequest.dividends_per_share_cagr_10 =
      this.data.data.financials.annual.dividends_per_share_cagr_10;
    this.apiRequest.payout_ratio =
      this.data.data.financials.annual.payout_ratio;
    this.apiRequest.debt_to_equity =
      this.data.data.financials.annual.debt_to_equity;
    this.apiRequest.debt_to_assets =
      this.data.data.financials.annual.debt_to_assets;
    this.apiRequest.equity_to_assets =
      this.data.data.financials.annual.equity_to_assets;
    this.apiRequest.assets_to_equity =
      this.data.data.financials.annual.assets_to_equity;
    this.apiRequest.revenue_per_share =
      this.data.data.financials.annual.revenue_per_share;
    this.apiRequest.ebitda_per_share =
      this.data.data.financials.annual.ebitda_per_share;
    this.apiRequest.operating_income_per_share =
      this.data.data.financials.annual.operating_income_per_share;
    this.apiRequest.pretax_income_per_share =
      this.data.data.financials.annual.pretax_income_per_share;
    this.apiRequest.fcf_per_share =
      this.data.data.financials.annual.fcf_per_share;
    this.apiRequest.book_value_per_share =
      this.data.data.financials.annual.book_value_per_share;
    this.apiRequest.shares_eop_growth =
      this.data.data.financials.annual.shares_eop_growth;
    this.apiRequest.net_income_growth =
      this.data.data.financials.annual.net_income_growth;
    this.apiRequest.gross_profit_growth =
      this.data.data.financials.annual.gross_profit_growth;
    this.apiRequest.fcf_growth = this.data.data.financials.annual.fcf_growth;
    this.apiRequest.ebitda_growth =
      this.data.data.financials.annual.ebitda_growth;
    this.apiRequest.operating_income_growth =
      this.data.data.financials.annual.operating_income_growth;
    this.apiRequest.total_assets_growth =
      this.data.data.financials.annual.total_assets_growth;
    this.apiRequest.total_equity_growth =
      this.data.data.financials.annual.total_equity_growth;
    this.apiRequest.cfo_growth = this.data.data.financials.annual.cfo_growth;
    this.apiRequest.revenue_cagr_10 =
      this.data.data.financials.annual.revenue_cagr_10;
    this.apiRequest.eps_diluted_cagr_10 =
      this.data.data.financials.annual.eps_diluted_cagr_10;
    this.apiRequest.total_assets_cagr_10 =
      this.data.data.financials.annual.total_assets_cagr_10;
    this.apiRequest.total_equity_cagr_10 =
      this.data.data.financials.annual.total_equity_cagr_10;
    this.apiRequest.fcf_cagr_10 = this.data.data.financials.annual.fcf_cagr_10;
    this.apiRequest.dividends_quarterly =
      this.data.data.financials.quarterly.dividends;
    this.apiRequest.dividends = this.data.data.financials.annual.dividends;
    this.apiRequest.roe_median = this.data.data.financials.annual.roe_median;
    this.apiRequest.price_to_book =
      this.data.data.financials.annual.price_to_book;
    this.apiRequest.enterprise_value_to_earnings =
      this.data.data.financials.annual.enterprise_value_to_earnings;
    this.apiRequest.enterprise_value_to_sales =
      this.data.data.financials.annual.enterprise_value_to_sales;
    this.apiRequest.enterprise_value_to_pretax_income =
      this.data.data.financials.annual.enterprise_value_to_pretax_income;
    this.apiRequest.enterprise_value_to_fcf =
      this.data.data.financials.annual.enterprise_value_to_fcf;
    this.apiRequest.roa_median = this.data.data.financials.annual.roa_median;
    this.apiRequest.roic_median = this.data.data.financials.annual.roic_median;
    this.apiRequest.gross_margin_median =
      this.data.data.financials.annual.gross_margin_median;
    this.apiRequest.pretax_margin_median =
      this.data.data.financials.annual.pretax_margin_median;
    this.apiRequest.fcf_margin_median =
      this.data.data.financials.annual.fcf_margin_median;
    this.apiRequest.assets_to_equity_median =
      this.data.data.financials.annual.assets_to_equity_median;
    this.apiRequest.debt_to_equity_median =
      this.data.data.financials.annual.debt_to_equity_median;
    this.apiRequest.debt_to_assets_median =
      this.data.data.financials.annual.debt_to_assets_median;
    this.apiRequest.revenue = this.data.data.financials.annual.revenue;
    this.apiRequest.gross_margin =
      this.data.data.financials.annual.gross_margin;
    this.apiRequest.eps_diluted = this.data.data.financials.annual.eps_diluted;
    this.apiRequest.eps_diluted_growth =
      this.data.data.financials.annual.eps_diluted_growth;
    this.apiRequest.dividends_per_share_growth =
      this.data.data.financials.annual.dividends_per_share_growth;

    // Store Company In Our DataBase And Return Data From There
    return this.apiService.post(
      `${environment.baseUrl}/api/keyStatistics`,
      this.requestService.data,
      { headers: { Authorization: this.userService.getToken() } }
    );
  }

  returnDataFromDataBase(res: any) {
    this.data = res;

    this.revenue_growthCopy = this?.splicedArray(this.data.revenue_growth);
    this.roe = this?.splicedArray(this.data.roe);

    console.log('roe', this.roe);

    // Best Mode Requrirements
    this.name = this.data.name;
    this.symbol = this.data.symbol;
    this.qfs_symbol = this.data.qfs_symbol;
    this.price = this.data.price;
    this.ev = this.data.ev;
    this.PE = this.data.pe_ratio;
    this.PS = this.data.ps_ratio;
    this.operatingMargin = (
      this.data.operating_margin?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.netIncomeMargin = this.data.net_income_margin?.splice(-1)[0];
    this.netIncomeMarginDone = (this.netIncomeMargin * 100)?.toFixed(1);
    this.totalAssets = this.oparator('+', this.data.total_current_assets);
    this.totalLibilites = this.oparator(
      '+',
      this.data.total_current_liabilities
    );
    this.roce = this.data.roce;
    this.bvRatio = (
      this.data.book_value_per_share.slice(-1)[0] / this.data.price
    )?.toFixed(2);

    this.revenueGrowth = this.data.revenue_growth?.splice(-1)[0];
    this.revenue_growthDone = Math.round(this.revenueGrowth * 100);
    this.flowPerShare = this.data.fcf_margin?.splice(-1)[0];
    this.flowPerShareDone = Math.round(this.flowPerShare * 100);

    this.ruleOf40 = this.flowPerShare + this.revenueGrowth;
    this.ruleOf40Done = Math.round(this.ruleOf40 * 100);

    this.jerry = this.ruleOf40 + this.netIncomeMargin;
    this.jerryDone = Math.ceil(this.jerry * 100);

    this.revenuePerShareRatio =
      this.data.revenue_per_share?.splice(-1)[0] / this.price;
    this.ebidtaPerShareRatio =
      this.data.ebitda_per_share?.splice(-1)[0] / this.price;

    this.marketCap = this.data.market_cap;
    this.operating_income_per_share = this.data.operating_income_per_share;
    this.pretax_income_per_share = this.data.pretax_income_per_share;
    this.dividends_quarterly = this.data.dividends_quarterly;
    this.deptToEquity = this.data.debt_to_equity?.splice(-1)[0];
    this.revenueRatio =
      parseInt(this.pretax_income_per_share) -
      parseInt(this.operating_income_per_share);
    this.total = (
      Math.round(Number(this.data.total_assets.slice(-1)[0]) / 1000000) /
      Math.round(Number(this.data.total_liabilities.slice(-1)[0]) / 1000000)
    )?.toFixed(2);

    this.roeOne = Math.round(this.data.roe?.splice(-1)[0] * 100);
    this.roceOne = Math.round(this.data.roce?.splice(-1)[0] * 100);

    this.marketCapFixed =
      (parseInt(this.marketCap) / 1000000)?.toFixed(0) + '$';
    this.industry = this.data.industry;
    this.currency = this.data.currency;

    // One Requirements
    if (!this.data) return;
    this.PE = this.data.pe_ratio;
    this.PB = this.data.pb_ratio;
    this.PS = this.data.ps_ratio;
    this.enterprise_value_to_earnings =
      this.data.enterprise_value_to_earnings?.splice(-1)[0];
    this.enterprise_value_to_sales =
      this.data.enterprise_value_to_sales?.splice(-1)[0];
    this.ebitda_per_share = this.data.ebitda_per_share?.splice(-1);
    this.enterprise_value_to_pretax_income =
      this.data.enterprise_value_to_pretax_income?.splice(-1)[0];
    this.enterprise_value_to_fcf =
      this.data.enterprise_value_to_fcf?.splice(-1);
    this.roa_median = this.data.roa_median;
    this.roe_median = this.data.roe_median;
    this.roic_median = this.data.roic_median;
    this.revenue_cagr_10 = this.data.revenue_cagr_10?.splice(-1);
    this.total_assets_cagr_10 = this.data.total_assets_cagr_10?.splice(-1);
    this.fcf_cagr_10 = this.data.fcf_cagr_10?.splice(-1);
    this.eps_diluted_cagr_10 = this.data.eps_diluted_cagr_10?.splice(-1);
    this.gross_margin_median = this.data.gross_margin_median;
    this.pretax_margin_median = this.data.pretax_margin_median;
    this.fcf_margin_median = this.data.fcf_margin_median;
    this.assets_to_equity_median = this.data.assets_to_equity_median;
    this.debt_to_equity_median = this.data.debt_to_equity_median;
    this.debt_to_assets_median = this.data.debt_to_assets_median;

    // Two Requirement
    if (!this.data) return;
    this.revenue = this?.splicedArray(this.data.revenue);
    this.gross_profit = this?.splicedArray(this.data.gross_profit);
    this.gross_margin = this?.splicedArray(this.data.gross_margin);
    this.operating_income = this?.splicedArray(this.data.operating_income);
    this.operating_margin = this?.splicedArray(this.data.operating_margin);
    this.eps_diluted = this?.splicedArray(this.data.eps_diluted);
    this.eps_diluted_growth = this?.splicedArray(this.data.eps_diluted_growth);
    this.dividends = this?.splicedArray(this.data.dividends);
    this.dividend_yield = this.data.dividends.slice(-1)[0] / this.price;
    this.dividend_yield = (
      (this.data.dividends.slice(-1)[0] / this.price) *
      100
    )?.toFixed(1);
    this.dividends_per_share_growth = this?.splicedArray(
      this.data.dividends_per_share_growth
    );
    this.roa = this?.splicedArray(this.data.roa);
    this.roic = this?.splicedArray(this.data.roic);
    this.price = Number(this.price)?.toFixed(2);
    this.init();
    this.inittwo();
    this.chart.ref$.subscribe((chart) => {});
    this.isResponseGet = true;
    this.loaderStarted = false;
    localStorage.responseData = JSON.stringify(res);
  }

  getData(e: any, searchKey: string) {
    this.loaderStarted = true;
    this.isResponseGet = false;
    if (e.target) {
      let id = Number(e.target.id);
      // e.target.value = '';
    }

    //first CAll
    this.callDataBase(searchKey).subscribe(
      (res) => {
        if (res == null) {
          //Second Call
          this.callApiAfterDataBase(searchKey).subscribe(
            (res) => {
              // console.log('resFromApi', res);

              this.data = res;
              this.data.qfs_symbol = this.data.data.metadata?.qfs_symbol;

              try {
                if (this.data.errors) {
                  this.isLoginError = true;
                  this.loaderStarted = false;
                }

                // Third Call
                this.getPriceDataFromItsApi(searchKey).subscribe(
                  (response) => {
                    this.apiRequest = response;

                    const targetItem = this.apiRequest.data.find(
                      (item: any) => {
                        const searchValue = item.qfs_symbol_v2;

                        if (searchValue == this.data.qfs_symbol) {
                          return item;
                        }
                      }
                    );

                    this.data.price = targetItem?.adjusted_close;
                    this.data.volume = targetItem?.volume;
                    this.data.market_cap = targetItem?.mkt_cap;
                    this.data.ev = targetItem?.ev;
                    this.data.pe_ratio = targetItem?.pe;
                    this.data.ps_ratio = targetItem?.ps;
                    this.data.pb_ratio = targetItem?.pb;
                    this.data.avg_vol_50d = targetItem?.avg_vol_50d;

                    //Fourth CAll
                    this.storeDataFromApiToDataBase(this.data).subscribe(
                      (res) => {
                        // console.log('res', res);
                        this.returnDataFromDataBase(res);

                        localStorage.latestSearchKey = searchKey;
                      },
                      (error) => {
                        alert('Sorry Your Number Of Requestes Done Today!');
                        e.target.value = '';
                        this.loaderStarted = false;
                        return;
                      }
                    );
                  },
                  (error) => {
                    // alert('Company Not Found');
                    this.isLoginError = true;
                    this.loaderStarted = false;
                    return;
                  }
                );
              } catch (e) {
                console.log('Company Not Found');
                this.loaderStarted = false;
                return;
              }
            },
            (error) => {
              console.log('Company Not Found');
              e.target.value = '';
              this.loaderStarted = false;
              return;
            }
          );
        } else {
          this.returnDataFromDataBase(res);
          localStorage.latestSearchKey = searchKey;
        }
      },
      (error) => {
        console.log('Company Not Found');
        e.target.value = '';
        this.loaderStarted = false;
        return;
      }
    );
  }

  getSearchValue(e: any, val: string) {
    if (e.inputType) {
      this.apiService
        .get(`${environment.baseUrl}/api/search/${val}`)
        .subscribe((response) => {
          if (response) {
            this.isPageLoaded = true;
            this.symbols = response;
          }
        }, console.error);
    } else {
      this.getData(e, e.target.value);
    }
  }

  resetPage() {
    if (confirm('Are you sure?')) {
      this.isResponseGet = false;
      this.loaderStarted = false;
      this.isLoginError = false;
      localStorage.removeItem('latestSearchKey');
      return;
    }
  }

  hide() {
    this.isLoginError = false;
  }

  // About print the page
  print() {
    window.print();
  }
}
