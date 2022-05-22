import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  getName() {
    const userInfo = localStorage.user;
    return userInfo && JSON.parse(userInfo).name;
  }

  isLoginError: boolean = true;
  now: any;

  roicArr: any = [];
  maxRoicArr: any;

  psRatio: any = [];
  maxPsRatio: any;
  minPsRatio: any;

  netIncomeMargin: any = [];
  maxNetIncomeMargin: any = [];

  roceArr: any = [];
  maxRoceArr: any;

  rotceArr: any = [];
  maxRotceArr: any;

  fiveRIndicatorArr: any = [];
  maxFiveRIndicatorArr: any;

  payoutRatio: any = [];
  maxPayoutRatio: any;

  deptToEquity: any = [];
  maxDeptToEquity: any;

  revenuePerShareRatio: any = [];
  maxRevenuePerShareRatio: any;

  editdaPerShareRatio: any = [];
  maxEditdaPerShareRatio: any;

  tAssetsArr: any = [];
  maxTAssetsArr: any;

  grossprofitGrowthArr: any = [];
  maxGrossProfitGrowthArr: any;
  minGrossProfitGrowthArr: any;

  freeCashFlowGrowthArr: any = [];
  maxFreeCashFlowGrowthArr: any;
  minFreeCashFlowGrowthArr: any;

  totalAssetsGrowthArr: any = [];
  maxTotalAssetsGrowthArr: any;
  minTotalAssetsGrowthArr: any;

  totalEquityGrowthArr: any = [];
  maxTotalEquityGrowthArr: any;
  minTotalEquityGrowthArr: any;

  cashFromOperationsGrowthArr: any = [];
  maxCashFromOperationsGrowthArr: any;
  minCashFromOperationsGrowthArr: any;

  revenue10PeriodCagrArr: any = [];
  maxRevenue10PeriodCagrArr: any;
  minRevenue10PeriodCagrArr: any;

  editdaPerShareRatioArr: any = [];
  maxEditdaPerShareRatioArr: any;
  minEditdaPerShareRatioArr: any;

  roeArr: any = [];
  maxRoeArr: any;
  minRoeArr: any;

  editaGrowthArr: any = [];
  maxEditaGrowthArr: any = [];
  minEditaGrowthArr: any = [];

  netIncomeGrowthArr: any = [];
  maxNetIncomeGrowthArr: any = [];
  minNetIncomeGrowthArr: any = [];

  ebitdaGrowthArr: any = [];
  maxEbitdaGrowthArr: any = [];
  minEbitdaGrowthArr: any = [];

  operationIncomeGrowthArr: any = [];
  maxOperationIncomeGrowthArr: any = [];
  minOperationIncomeGrowthArr: any = [];

  revenueGrowthLastYearArr: any = [];
  maxRevenueGrowthLastYearArr: any = [];
  minRevenueGrowthLastYearArr: any = [];

  freeCashFlowMarginArr: any = [];
  maxFreeCashFlowMarginArr: any = [];
  minFreeCashFlowMarginArr: any = [];

  ruleOf50Arr: any = [];
  maxRuleOf50Arr: any = [];
  minRuleOf50Arr: any = [];

  jerryArr: any = [];
  maxJerryArr: any = [];
  minJerryArr: any = [];

  bvRatioArr: any = [];
  maxBvRatioArr: any = [];

  roaArr: any = [];
  maxRoaArr: any = [];

  roteArr: any = [];
  maxRoteArr: any = [];

  dividendsYieldArr: any = [];
  maxDividendsYieldArr: any = [];

  tAssetsVArr: any = [];
  maxTAssetsVArr: any = [];

  peRatioArr: any = [];
  higherOrLowerValuesPeRatioArr: any = [];

  loaderStarted: boolean = false;
  numbers: any;
  apiRequest: any;
  dataCompanyOne: any;
  industry: any;
  data: any;
  sector: any;
  exchange: any;
  marketCap: any;
  // marketCapFixed:any;
  enterprise: any;
  enterpriseFixed: any;
  PE: any;
  PS: any;
  Cost_of_goods_sold: any;
  gross_profit: any;
  total_operation: any;
  ROIC: any;
  five_r_indiator: any;
  dividende_per_share: any;
  dividend_yield: any;
  payout_ratio: any;
  debt_to_equity: any;
  debt_to_assets: any;
  assets_to_equity: any;
  revenue_per_share: any;
  ebitda_per_share: any;
  revenue_per_share_ratio: any;
  ebitda_per_share_ratio: any;
  operating_income_per_share: any;
  operating_income_per_share_ratio: any;
  pretax_income_per_share: any;
  pretax_income_per_share_ratio: any;
  free_cash_flow_per_share: any;
  total_assets_growth: any;
  total_equity_growth: any;
  cash_from_operating_growth: any;
  revenue_cagr_10: any;
  total_assets_cagr_10: any;
  total_equity_cagr_10: any;
  free_cash_flow_10_period: any;
  dlkfj: any;
  properties: any;
  isPropertiesLoaded: boolean = false;

  isResponseBack: boolean = false;
  isAdmin: boolean = false;

  allStatus = [false, false, false, false, false, false];

  oparator(op: any, arr: any) {
    return eval(arr.join(op))?.toFixed(2) + '%';
  }

  constructor(
    private requestService: RequestService,
    private apiService: ApiService,
    private userService: UserService
  ) {}
  ArrayOfData: any[] = [[], [], [], [], [], []];

  ArrayOfSearchInputs: String[] = ['', '', '', '', '', '', '', ''];
  ArrayOfSearchNames: String[] = ['', '', '', '', '', '', '', ''];

  ngOnInit(): void {
    this.now = new Date().toLocaleDateString();

    if (localStorage.ArrayOfSearchInputs) {
      this.ArrayOfSearchInputs = JSON.parse(localStorage.ArrayOfSearchInputs);
    }

    if (localStorage.ArrayOfSearchNames) {
      this.ArrayOfSearchNames = JSON.parse(localStorage.ArrayOfSearchNames);
    }

    this.isAdmin = this.userService.isAdmin();
    //Get All Property
    this.apiService
      .get(`${environment.baseUrl}/api/properties`, {
        headers: { Authorization: this.userService.getToken() },
      })
      .subscribe((response) => {
        this.properties = response;
        this.properties = this.properties;

        // Check For Latest Search
        if (localStorage.ArrayOfData) {
          this.ArrayOfData = JSON.parse(localStorage.ArrayOfData);

          for (let i: any = 0; i < this.ArrayOfData.length; i++) {
            if (this.ArrayOfData[i].length != 0) {
              this.allStatus[i] = true;
              this.updateAllOperations(i);
            }
          }
          this.isResponseBack = true;
        }
        this.isPropertiesLoaded = true;
      });
  }

  updateProperty(e: any, title: string, comment: string) {
    const id = e.target.id;
    this.apiService
      .post(
        `${environment.baseUrl}/api/properties/${id}`,
        { title, comment },
        { headers: { Authorization: this.userService.getToken() } }
      )
      .subscribe((res) => {
        const response: any = res;
        response.msg ? alert('Method Not Allowed') : location.reload();
      });
  }

  callDataBase(searchKey: string) {
    // if (searchKey.includes(':')) {
    //   searchKey = searchKey.substring(0, searchKey.lastIndexOf(':'));
    // };
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
      `https://public-api.quickfs.net/v1/data/all-data/${searchKey}?api_key=8efcfb97fcb6b39a887149f058b54f1940ccdbb8`
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

    this.apiRequest.dividends_quarterly =
      this.data.data.financials.quarterly.dividends;

    //Latest Data in Requirements file
    this.apiRequest.shares_basic = this.data.data.financials.ttm.shares_basic;
    this.apiRequest.shares_diluted =
      this.data.data.financials.ttm.shares_diluted;
    this.apiRequest.eps_diluted_cagr_10 =
      this.data.data.financials.annual.eps_diluted_cagr_10;

    this.apiRequest.price = this.data.price;
    this.apiRequest.volume = this.data.volume;
    this.apiRequest.market_cap = this.data.market_cap;
    this.apiRequest.pe_ratio = this.data.pe_ratio;
    this.apiRequest.ps_ratio = this.data.ps_ratio;
    this.apiRequest.pb_ratio = this.data.pb_ratio;
    this.apiRequest.beta = this.data.beta;
    this.apiRequest.ev = this.data.ev;
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

    // New
    this.apiRequest.shares_eop = this.data.data.financials.annual.shares_eop;

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

  returnDataFromDataBase(res: any, id: any) {
    // try {
    this.arraysData[id] = res;
    this.allStatus[id] = true;
    this.ArrayOfData[id][0] = Number(this.arraysData[id].price);
    this.ArrayOfData[id][1] = this.arraysData[id].price;
    this.ArrayOfData[id][2] = this.arraysData[id].industry;
    this.ArrayOfData[id][3] = this.arraysData[id].sector;
    this.ArrayOfData[id][4] = this.arraysData[id].exchange;
    this.ArrayOfData[id][5] = this.arraysData[id].market_cap;
    this.ArrayOfData[id][6] = this.arraysData[id].ev;
    this.ArrayOfData[id][7] = this.arraysData[id].volume;
    this.ArrayOfData[id][8] = Math.round(this.arraysData[id].avg_vol_50d);
    this.ArrayOfData[id][9] = (
      Number(this.arraysData[id].volume) -
      Number(this.ArrayOfData[id][7]) / 14 / this.ArrayOfData[id][8]
    )?.toFixed(1);
    // this.ArrayOfData[id][10] = ((Number(this.arraysData[id].shares_basic) / Number(this.arraysData[id].shares_diluted)) * 100)?.toFixed(2)

    this.ArrayOfData[id][10] =
      this.arraysData[id].shares_diluted / 1000000 / this.arraysData[id].beta;

    this.ArrayOfData[id][12] = this.arraysData[id].pe_ratio;
    this.ArrayOfData[id][13] = this.arraysData[id].ps_ratio;
    this.ArrayOfData[id][14] = '';
    this.ArrayOfData[id][15] = Math.round(
      this.arraysData[id].revenue?.slice(-1)[0] / 1000000
    );

    this.ArrayOfData[id][16] = Math.round(
      this.arraysData[id].cogs?.slice(-1)[0] / 1000000
    );
    this.ArrayOfData[id][17] = Math.round(
      this.arraysData[id].gross_profit?.slice(-1) / 1000000
    );
    this.ArrayOfData[id][18] = parseInt(
      this.arraysData[id].total_opex?.slice(-1)[0]
    );
    this.ArrayOfData[id][18] = Math.round(this.ArrayOfData[id][18] / 1000000);
    this.ArrayOfData[id][19] = (
      this.arraysData[id].roic?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][20] = Math.round(
      this.arraysData[id].operating_income?.slice(-1)[0] / 1000000
    );
    this.ArrayOfData[id][21] = (
      this.arraysData[id].operating_margin?.slice(-1)[0] * 100
    )?.toFixed(2);
    this.ArrayOfData[id][22] = Math.round(
      this.arraysData[id].pretax_income?.slice(-1)[0] / 1000000
    );
    this.ArrayOfData[id][23] = Math.round(
      this.arraysData[id].net_income?.slice(-1)[0] / 1000000
    );
    this.ArrayOfData[id][24] =
      this.arraysData[id].net_income_margin?.slice(-1)[0] * 100;

    this.ArrayOfData[id][25] = (
      this.arraysData[id].payout_ratio?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][26] = this.arraysData[id].debt_to_equity
      ?.slice(-1)[0]
      ?.toFixed(2);
    this.ArrayOfData[id][27] = this.arraysData[id].equity_to_assets
      ?.slice(-1)[0]
      ?.toFixed(2);
    this.ArrayOfData[id][28] = this.arraysData[id].debt_to_assets
      ?.slice(-1)[0]
      ?.toFixed(2);
    this.ArrayOfData[id][29] = this.arraysData[id].assets_to_equity
      ?.slice(-1)[0]
      ?.toFixed(1);
    this.ArrayOfData[id][32] = (
      Number(this.arraysData[id].revenue_per_share?.slice(-1)[0]) /
      Number(this.arraysData[id].price)
    )?.toFixed(2);
    this.ArrayOfData[id][31] =
      this.arraysData[id].revenue_per_share?.slice(-1)[0]?.toFixed(2) + ' $';
    this.ArrayOfData[id][34] = (
      this.arraysData[id].ebitda_per_share?.slice(-1)[0] /
      this.arraysData[id].price
    )?.toFixed(2);
    this.ArrayOfData[id][33] = this.arraysData[id].ebitda_per_share
      ?.slice(-1)[0]
      ?.toFixed(2);
    this.ArrayOfData[id][36] = (
      this.arraysData[id].operating_income_per_share?.slice(-1)[0] /
      this.arraysData[id].price
    )?.toFixed(2);
    this.ArrayOfData[id][35] = this.arraysData[id].operating_income_per_share
      ?.slice(-1)[0]
      ?.toFixed(2);
    this.ArrayOfData[id][37] = this.arraysData[id].pretax_income_per_share
      ?.slice(-1)[0]
      ?.toFixed(2);
    this.ArrayOfData[id][38] = (
      Number(this.arraysData[id].pretax_income_per_share?.slice(-1)[0]) /
      Number(this.arraysData[id].price)
    )?.toFixed(2);
    this.ArrayOfData[id][39] = this.arraysData[id].fcf_per_share
      ?.slice(-1)[0]
      ?.toFixed(2);
    this.ArrayOfData[id][40] = Math.round(
      this.arraysData[id].shares_basic / 1000000
    );
    this.ArrayOfData[id][41] = Math.round(
      this.arraysData[id].shares_diluted / 1000000
    );
    this.ArrayOfData[id][42] = Number(
      this.arraysData[id].book_value_per_share?.slice(-1)[0]
    )?.toFixed(2);
    this.ArrayOfData[id][46] = 'black line';
    this.ArrayOfData[id][47] = Number(
      (this.arraysData[id].revenue_cagr_10?.slice(-1)[0] * 100)?.toFixed(1)
    );
    this.ArrayOfData[id][48] = (
      this.arraysData[id].eps_diluted_cagr_10?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][49] = (
      this.arraysData[id].total_assets_cagr_10?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][50] = (
      this.arraysData[id].total_equity_cagr_10?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][51] = (
      this.arraysData[id].fcf_cagr_10?.slice(-1)[0] * 100
    )?.toFixed(1);

    // New Section (BALANCE Sheet)
    this.ArrayOfData[id][52] = 'black line';
    this.ArrayOfData[id][53] = Math.round(
      Number(this.arraysData[id].total_current_assets?.slice(-1)[0]) / 1000000
    );
    this.ArrayOfData[id][54] = Math.round(
      Number(this.arraysData[id].total_current_liabilities?.slice(-1)[0]) /
        1000000
    );
    this.ArrayOfData[id][55] = Math.round(
      this.ArrayOfData[id][53] - this.ArrayOfData[id][54]
    );
    this.ArrayOfData[id][56] = (
      this.ArrayOfData[id][53] / this.ArrayOfData[id][54]
    )?.toFixed(1);
    this.ArrayOfData[id][57] = Math.round(
      Number(this.arraysData[id].total_assets?.slice(-1)[0]) / 1000000
    );
    this.ArrayOfData[id][58] = Math.round(
      Number(this.arraysData[id].total_liabilities?.slice(-1)[0]) / 1000000
    );
    this.ArrayOfData[id][59] = (
      this.ArrayOfData[id][57] / this.ArrayOfData[id][58]
    )?.toFixed(2);

    // New Section (Key Metric)
    this.ArrayOfData[id][60] = 'black line';
    this.ArrayOfData[id][61] = (
      Number(this.arraysData[id].revenue_growth?.slice(-1)[0]) * 100
    )?.toFixed(2);
    this.ArrayOfData[id][62] = (
      Number(this.arraysData[id].fcf_margin?.slice(-1)[0]) * 100
    )?.toFixed(2);
    this.ArrayOfData[id][63] = (
      Number(this.arraysData[id].revenue_growth?.slice(-1)[0]) * 100 +
      Number(this.arraysData[id].fcf_margin?.slice(-1)[0]) * 100
    )?.toFixed(2);
    this.ArrayOfData[id][64] = (
      Number(this.arraysData[id].revenue_growth?.slice(-1)[0]) * 100 +
      Number(this.arraysData[id].fcf_margin?.slice(-1)[0]) * 100 +
      this.ArrayOfData[id][24]
    )?.toFixed(2);

    this.ArrayOfData[id][24] = this.ArrayOfData[id][24]?.toFixed(2);

    this.ArrayOfData[id][65] = (
      this.arraysData[id].book_value_per_share?.slice(-1)[0] /
      this.arraysData[id].price
    )?.toFixed(2);

    // New Section (management effictivenece)
    this.ArrayOfData[id][66] = 'black line';
    this.ArrayOfData[id][67] = this.arraysData[id].roe?.slice(-1)[0] * 100;
    this.ArrayOfData[id][68] = this.arraysData[id].roa?.slice(-1)[0] * 100;
    this.ArrayOfData[id][69] = this.arraysData[id].roic?.slice(-1)[0] * 100;
    this.ArrayOfData[id][70] = this.arraysData[id].roce?.slice(-1)[0] * 100;
    this.ArrayOfData[id][71] = this.arraysData[id].rotce?.slice(-1)[0] * 100;

    this.ArrayOfData[id][72] =
      this.ArrayOfData[id][67] +
      this.ArrayOfData[id][68] +
      this.ArrayOfData[id][69] +
      this.ArrayOfData[id][70] +
      this.ArrayOfData[id][71];
    this.ArrayOfData[id][72] = this.ArrayOfData[id][72]?.toFixed(1);

    this.ArrayOfData[id][67] = this.ArrayOfData[id][67]?.toFixed(1);
    this.ArrayOfData[id][68] = this.ArrayOfData[id][68]?.toFixed(1);
    this.ArrayOfData[id][69] = this.ArrayOfData[id][69]?.toFixed(1);
    this.ArrayOfData[id][70] = this.ArrayOfData[id][70]?.toFixed(1);
    this.ArrayOfData[id][71] = this.ArrayOfData[id][71]?.toFixed(1);

    // this.ArrayOfData[id][72] = 'Sum(Roe : Rote)';
    this.ArrayOfData[id][73] = Number(
      this.arraysData[id].dividends?.slice(-1)[0]
    );
    this.ArrayOfData[id][74] = (
      (this.ArrayOfData[id][73] / this.ArrayOfData[id][0]) *
      100
    )?.toFixed(1);

    this.ArrayOfData[id][0] = this.ArrayOfData[id][0].toFixed(2) + ' $';

    this.ArrayOfData[id][75] = (
      this.arraysData[id].payout_ratio?.slice(-1)[0] * 100
    )?.toFixed(1);

    // New Section (Growht Metrics)
    this.ArrayOfData[id][76] = 'black line';
    this.ArrayOfData[id][77] = (
      Number(this.arraysData[id].net_income_growth?.slice(-1)[0]) * 100
    )?.toFixed(1);
    this.ArrayOfData[id][78] = (
      Number(this.arraysData[id].gross_profit_growth?.slice(-1)[0]) * 100
    )?.toFixed(1);
    this.ArrayOfData[id][79] = (
      this.arraysData[id].fcf_growth?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][80] = (
      this.arraysData[id].ebitda_growth?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][81] = (
      this.arraysData[id].operating_income_growth?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][82] = (
      this.arraysData[id].total_assets_growth?.slice(-1)[0] * 100
    )?.toFixed(1);
    this.ArrayOfData[id][83] = Number(
      (this.arraysData[id].total_equity_growth?.slice(-1)[0] * 100)?.toFixed(1)
    );
    this.ArrayOfData[id][84] = Number(
      (this.arraysData[id].cfo_growth?.slice(-1)[0] * 100)?.toFixed(1)
    );

    // push values to operating it
    this.updateAllOperations(id);

    localStorage.ArrayOfSearchInputs = JSON.stringify(
      this.ArrayOfSearchInputs.map((item) => item.toUpperCase())
    );

    this.ArrayOfSearchNames[id] = this.arraysData[id].name;
    localStorage.ArrayOfSearchNames = JSON.stringify(this.ArrayOfSearchNames);
    localStorage.ArrayOfData = JSON.stringify(this.ArrayOfData);
    this.loaderStarted = false;
    this.isResponseBack = true;
  }

  updateAllOperations(id: number) {
    this.psRatio.push(this.ArrayOfData[id][13]);
    this.maxPsRatio = this.getMax(this.psRatio);
    this.minPsRatio = this.getMin(this.psRatio);

    this.netIncomeMargin.push(this.ArrayOfData[id][24]);
    this.maxNetIncomeMargin = this.getMax(this.netIncomeMargin);

    this.grossprofitGrowthArr.push(this.ArrayOfData[id][78]);
    this.maxGrossProfitGrowthArr = this.getMax(this.grossprofitGrowthArr);
    this.minGrossProfitGrowthArr = this.getMin(this.grossprofitGrowthArr);

    this.roicArr.push(this.ArrayOfData[id][69]);
    this.maxRoicArr = this.getMax(this.roicArr);

    this.roceArr.push(this.ArrayOfData[id][70]);
    this.maxRoceArr = this.getMax(this.roceArr);

    this.rotceArr.push(this.ArrayOfData[id][21]);
    this.maxRotceArr = this.getMax(this.rotceArr);

    this.fiveRIndicatorArr.push(this.ArrayOfData[id][72]);
    this.maxFiveRIndicatorArr = this.getMax(this.fiveRIndicatorArr);

    this.deptToEquity.push(this.ArrayOfData[id][26]);
    this.maxDeptToEquity = this.getMin(this.deptToEquity);

    this.payoutRatio.push(this.ArrayOfData[id][75]);
    this.maxPayoutRatio = this.getMax(this.payoutRatio);

    this.revenuePerShareRatio.push(this.ArrayOfData[id][32]);
    this.maxRevenuePerShareRatio = this.getMax(this.revenuePerShareRatio);

    this.editdaPerShareRatio.push(this.ArrayOfData[id][34]);
    this.maxEditdaPerShareRatio = this.getMax(this.editdaPerShareRatio);

    this.tAssetsArr.push(this.ArrayOfData[id][34]);
    this.maxTAssetsArr = this.getMax(this.tAssetsArr);

    this.revenueGrowthLastYearArr.push(this.ArrayOfData[id][61]);
    this.maxRevenueGrowthLastYearArr = this.getMax(
      this.revenueGrowthLastYearArr
    );
    this.minRevenueGrowthLastYearArr = this.getMax(
      this.revenueGrowthLastYearArr
    );

    this.freeCashFlowMarginArr.push(this.ArrayOfData[id][62]);
    this.maxFreeCashFlowMarginArr = this.getMax(this.freeCashFlowMarginArr);
    this.minFreeCashFlowMarginArr = this.getMax(this.freeCashFlowMarginArr);

    this.ruleOf50Arr.push(this.ArrayOfData[id][63]);
    this.maxRuleOf50Arr = this.getMax(this.ruleOf50Arr);
    this.minRuleOf50Arr = this.getMax(this.ruleOf50Arr);

    this.jerryArr.push(this.ArrayOfData[id][64]);
    this.maxJerryArr = this.getMax(this.jerryArr);
    this.minJerryArr = this.getMax(this.jerryArr);

    this.bvRatioArr.push(this.ArrayOfData[id][65]);
    this.maxBvRatioArr = this.getMax(this.bvRatioArr);

    this.roaArr.push(this.ArrayOfData[id][68]);
    this.maxRoaArr = this.getMax(this.roaArr);

    this.roteArr.push(this.ArrayOfData[id][71]);
    this.maxRoteArr = this.getMax(this.roteArr);

    this.dividendsYieldArr.push(this.ArrayOfData[id][74]);
    this.maxDividendsYieldArr = this.getMax(this.dividendsYieldArr);

    this.freeCashFlowGrowthArr.push(this.ArrayOfData[id][79]);
    this.maxFreeCashFlowGrowthArr = this.getMax(this.freeCashFlowGrowthArr);
    this.minFreeCashFlowGrowthArr = this.getMin(this.freeCashFlowGrowthArr);

    this.totalAssetsGrowthArr.push(this.ArrayOfData[id][82]);
    this.maxTotalAssetsGrowthArr = this.getMax(this.totalAssetsGrowthArr);
    this.minTotalAssetsGrowthArr = this.getMin(this.totalAssetsGrowthArr);

    this.totalEquityGrowthArr.push(this.ArrayOfData[id][83]);
    this.maxTotalEquityGrowthArr = this.getMax(this.totalEquityGrowthArr);
    this.minTotalEquityGrowthArr = this.getMin(this.totalEquityGrowthArr);

    this.cashFromOperationsGrowthArr.push(this.ArrayOfData[id][84]);
    this.maxCashFromOperationsGrowthArr = this.getMax(
      this.cashFromOperationsGrowthArr
    );
    this.minCashFromOperationsGrowthArr = this.getMin(
      this.cashFromOperationsGrowthArr
    );

    this.revenue10PeriodCagrArr.push(this.ArrayOfData[id][47]);
    this.maxRevenue10PeriodCagrArr = this.getMax(this.revenue10PeriodCagrArr);
    this.minRevenue10PeriodCagrArr = this.getMin(this.revenue10PeriodCagrArr);

    this.roeArr.push(this.ArrayOfData[id][67]);
    this.maxRoeArr = this.getMax(this.roeArr);
    this.minRoeArr = this.getMin(this.roeArr);

    this.tAssetsVArr.push(this.ArrayOfData[id][59]);
    this.maxTAssetsVArr = this.getMax(this.tAssetsVArr);

    this.netIncomeGrowthArr.push(this.ArrayOfData[id][77]);
    this.maxNetIncomeGrowthArr = this.getMax(this.netIncomeGrowthArr);
    this.minNetIncomeGrowthArr = this.getMin(this.netIncomeGrowthArr);

    this.editaGrowthArr.push(this.ArrayOfData[id][80]);
    this.maxEditaGrowthArr = this.getMax(this.editaGrowthArr);
    this.minEditaGrowthArr = this.getMin(this.editaGrowthArr);

    this.operationIncomeGrowthArr.push(this.ArrayOfData[id][81]);
    this.maxOperationIncomeGrowthArr = this.getMax(
      this.operationIncomeGrowthArr
    );
    this.minOperationIncomeGrowthArr = this.getMin(
      this.operationIncomeGrowthArr
    );

    this.peRatioArr.push(this.ArrayOfData[id][12]);
    this.higherOrLowerValuesPeRatioArr = this.lessZeroOrHigherHundred(
      this.peRatioArr
    );
  }

  arraysData: any = [
    Object(),
    Object(),
    Object(),
    Object(),
    Object(),
    Object(),
    Object(),
  ];

  getData(e: any, searchKey: string) {
    if (!searchKey) {
      e.preventDefault();
      return;
    }
    this.loaderStarted = true;
    let id = Number(e.target.id);

    //first CAll
    this.callDataBase(searchKey).subscribe(
      (res) => {
        if (res == null) {
          //Second Call
          this.callApiAfterDataBase(searchKey).subscribe(
            (res) => {
              this.arraysData[id] = res;

              try {
                this.arraysData[id].qfs_symbol =
                  this.arraysData[id].data.metadata.qfs_symbol;

                if (this.arraysData[id].errors) {
                  this.isLoginError = true;
                  this.loaderStarted = false;
                  e.target.value = '';
                  return;
                }

                // Third Call
                this.getPriceDataFromItsApi(searchKey).subscribe(
                  (response) => {
                    this.apiRequest = response;

                    const targetItem = this.apiRequest.data.find(
                      (item: any) => {
                        const searchValue = item.qfs_symbol_v2;
                        if (searchValue == this.arraysData[id].qfs_symbol) {
                          return item;
                        }
                      }
                    );

                    this.arraysData[id].price = targetItem?.adjusted_close;
                    this.arraysData[id].volume = targetItem?.volume;
                    this.arraysData[id].market_cap = targetItem?.mkt_cap;
                    this.arraysData[id].pe_ratio = targetItem?.pe;
                    this.arraysData[id].ps_ratio = targetItem?.ps;
                    this.arraysData[id].pb_ratio = targetItem?.pb;
                    this.arraysData[id].beta = targetItem?.beta;
                    this.arraysData[id].ev = targetItem?.ev;
                    this.arraysData[id].avg_vol_50d = targetItem?.avg_vol_50d;

                    //Fourth CAll
                    this.storeDataFromApiToDataBase(
                      this.arraysData[id]
                    ).subscribe(
                      (res) => {
                        this.returnDataFromDataBase(res, id);
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
                  (error) => console.log('company not found')
                );
              } catch (err) {
                alert(
                  'Uh oh. We could not find that stock (we do not have ETFs, Indexes, or FUNDS). Contact us on Patreon to'
                );
                e.target.value = '';
                this.loaderStarted = false;
                return;
              }
            },
            (error) => {
              e.target.value = '';
              this.loaderStarted = false;
              return;
            }
          );
        } else {
          this.returnDataFromDataBase(res, id);
        }
      },
      (error) => {
        e.target.value = '';
        this.loaderStarted = false;
        return;
      }
    );
  }

  //-------------------------------------------------------- Operating ------------------------------//
  //1- Gross Profit Growth
  // Get maximum value from array
  getMax(arr: any) {
    const newArr = arr.filter(Boolean);
    return Math.max.apply(null, newArr);
  }

  getMin(arr: any) {
    const newArr = arr.filter(Boolean);
    return Math.min.apply(null, newArr);
  }

  lessZeroOrHigherHundred(arr: any) {
    const newArr = arr.filter(Boolean);

    return newArr?.filter((item: any) => {
      return item < 0 || item > 100;
    });
  }

  resetPage() {
    if (confirm('Are you sure?')) {
      this.isResponseBack = false;
      this.allStatus.fill(false);
      this.ArrayOfSearchInputs.fill('');
      this.ArrayOfSearchNames.fill('');
      this.ArrayOfData = [[], [], [], [], [], []];

      localStorage.removeItem('ArrayOfSearchInputs');
      localStorage.removeItem('ArrayOfSearchNames');
      localStorage.removeItem('ArrayOfData');
      localStorage.removeItem('responseData');
    }
  }

  hide() {
    this.isLoginError = false;
  }
}
