import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class RequestFunctionsService {

  local: any;
  // Data = new BehaviorSubject<any>(null);

  Data = new Subject<any>();

  setCompanyData(info: any) {
    this.Data.next(info);
  }

  setFirstValueOfSubject(){
    // this.http.get(`http://beastmodeanalysis.com/api/keyStatistics/FB`).subscribe(res => {
    //   this.setCompanyData(res);
    // });
  }


  constructor(private requestService: RequestService, private http: HttpClient) {

  }





  data: any;
  responseData: any;
  apiRequest: any;

  getData(searchKey: string) {
    // Chanang Of Requests
    // 1- Check If Country In DataBase Or Not
    this.http.get(`http://beastmodeanalysis.com/api/keyStatistics/${searchKey.toUpperCase()}`).subscribe(res => {

      // If Company Does't exist
      if (res == null) {

        // Send Request To Api To Get Company
        this.http.get(`http://public-api.quickfs.net/v1/data/all-data/${searchKey}?api_key=4ed0f30c148834139f4bb3c4421341690f3d3c07`).subscribe(res => {
          this.data = res;
          if (this.data.errors) {
            alert('Company Not Found');
            return console.log('not found')
          };


          // If Company Exist
          // Start Of Send Requests
          this.apiRequest = this.requestService.data;

          this.apiRequest.name = this.data.data.metadata.name;
          this.apiRequest.description = this.data.data.metadata.description;
          this.apiRequest.country = this.data.data.metadata.country;
          this.apiRequest.symbol = this.data.data.metadata.symbol;
          this.apiRequest.exchange = this.data.data.metadata.exchange;
          this.apiRequest.industry = this.data.data.metadata.industry;
          this.apiRequest.sector = this.data.data.metadata.sector;
          this.apiRequest.qfs_symbol = this.data.data.metadata.qfs_symbol;
          this.apiRequest.market_cap = this.data.data.financials.quarterly.market_cap;
          this.apiRequest.enterprise_value = this.data.data.financials.quarterly.enterprise_value;
          this.apiRequest.volume = '';
          this.apiRequest.average_daily_volume = '';
          this.apiRequest.volume_inc_dec = '';
          this.apiRequest.price_to_earnings = this.data.data.financials.annual.price_to_earnings;
          this.apiRequest.price_to_sales = this.data.data.financials.annual.price_to_sales;
          this.apiRequest.total_revenue = [];
          this.apiRequest.cogs = this.data.data.financials.ttm.cogs;
          this.apiRequest.gross_profit = this.data.data.financials.annual.gross_profit;
          this.apiRequest.total_opex = this.data.data.financials.quarterly.total_opex;
          this.apiRequest.operating_margin = this.data.data.financials.annual.operating_margin;
          this.apiRequest.operating_income = this.data.data.financials.annual.operating_income;
          this.apiRequest.pretax_income = this.data.data.financials.quarterly.pretax_income;
          this.apiRequest.net_income = this.data.data.financials.quarterly.net_income;
          this.apiRequest.net_income_margin = this.data.data.financials.quarterly.net_income_margin;
          this.apiRequest.total_current_assets = this.data.data.financials.quarterly.total_current_assets;
          this.apiRequest.total_current_liabilities = this.data.data.financials.quarterly.total_current_liabilities;
          this.apiRequest.total_assets = this.data.data.financials.quarterly.total_assets;
          this.apiRequest.total_liabilities = this.data.data.financials.quarterly.total_liabilities;
          this.apiRequest.revenue_growth = this.data.data.financials.annual.revenue_growth;
          this.apiRequest.fcf_margin = this.data.data.financials.quarterly.fcf_margin;
          this.apiRequest.roe = this.data.data.financials.annual.roe;
          this.apiRequest.roa = this.data.data.financials.annual.roa;
          this.apiRequest.roic = this.data.data.financials.annual.roic;
          this.apiRequest.roce = this.data.data.financials.quarterly.roce;
          this.apiRequest.rotce = this.data.data.financials.annual.rotce;
          this.apiRequest.dividends_per_share_cagr_10 = this.data.data.financials.quarterly.dividends_per_share_cagr_10;
          this.apiRequest.payout_ratio = this.data.data.financials.quarterly.payout_ratio;
          this.apiRequest.debt_to_equity = this.data.data.financials.quarterly.debt_to_equity;
          this.apiRequest.debt_to_assets = this.data.data.financials.quarterly.debt_to_assets;
          this.apiRequest.equity_to_assets = this.data.data.financials.quarterly.equity_to_assets;
          this.apiRequest.assets_to_equity = this.data.data.financials.quarterly.assets_to_equity;
          this.apiRequest.revenue_per_share = this.data.data.financials.quarterly.revenue_per_share;
          this.apiRequest.ebitda_per_share = this.data.data.financials.quarterly.ebitda_per_share;
          this.apiRequest.operating_income_per_share = this.data.data.financials.quarterly.operating_income_per_share;
          this.apiRequest.pretax_income_per_share = this.data.data.financials.quarterly.pretax_income_per_share;
          this.apiRequest.fcf_per_share = this.data.data.financials.quarterly.fcf_per_share;
          this.apiRequest.book_value_per_share = this.data.data.financials.quarterly.book_value_per_share;
          this.apiRequest.shares_eop_growth = this.data.data.financials.quarterly.shares_eop_growth;
          this.apiRequest.net_income_growth = this.data.data.financials.quarterly.net_income_growth;
          this.apiRequest.gross_profit_growth = this.data.data.financials.quarterly.gross_profit_growth;
          this.apiRequest.fcf_growth = this.data.data.financials.quarterly.fcf_growth;
          this.apiRequest.ebitda_growth = this.data.data.financials.quarterly.ebitda_growth;
          this.apiRequest.operating_income_growth = this.data.data.financials.quarterly.operating_income_growth;
          this.apiRequest.total_assets_growth = this.data.data.financials.quarterly.total_assets_growth;
          this.apiRequest.total_equity_growth = this.data.data.financials.quarterly.total_equity_growth;
          this.apiRequest.cfo_growth = this.data.data.financials.quarterly.cfo_growth;
          this.apiRequest.revenue_cagr_10 = this.data.data.financials.annual.revenue_cagr_10;
          this.apiRequest.eps_diluted_cagr_10 = this.data.data.financials.annual.eps_diluted_cagr_10;
          this.apiRequest.total_assets_cagr_10 = this.data.data.financials.annual.total_assets_cagr_10;
          this.apiRequest.total_equity_cagr_10 = this.data.data.financials.annual.total_equity_cagr_10;
          this.apiRequest.fcf_cagr_10 = this.data.data.financials.annual.fcf_cagr_10;
          this.apiRequest.dividends_quarterly = this.data.data.financials.quarterly.dividends;
          this.apiRequest.dividends_annual = this.data.data.financials.annual.dividends;
          this.apiRequest.roe_median = this.data.data.financials.annual.roe_median;
          this.apiRequest.price_to_book = this.data.data.financials.quarterly.price_to_book;
          this.apiRequest.enterprise_value_to_earnings = this.data.data.financials.annual.enterprise_value_to_earnings;
          this.apiRequest.enterprise_value_to_sales = this.data.data.financials.annual.enterprise_value_to_sales;
          this.apiRequest.enterprise_value_to_pretax_income = this.data.data.financials.annual.enterprise_value_to_pretax_income;
          this.apiRequest.enterprise_value_to_fcf = this.data.data.financials.annual.enterprise_value_to_fcf;
          this.apiRequest.roa_median = this.data.data.financials.annual.roa_median;
          this.apiRequest.roic_median = this.data.data.financials.annual.roic_median;
          this.apiRequest.gross_margin_median = this.data.data.financials.quarterly.gross_margin_median;
          this.apiRequest.pretax_margin_median = this.data.data.financials.quarterly.pretax_margin_median;
          this.apiRequest.fcf_margin_median = this.data.data.financials.quarterly.fcf_margin_median;
          this.apiRequest.assets_to_equity_median = this.data.data.financials.quarterly.assets_to_equity_median;
          this.apiRequest.debt_to_equity_median = this.data.data.financials.quarterly.debt_to_equity_median;
          this.apiRequest.debt_to_assets_median = this.data.data.financials.quarterly.debt_to_assets_median;
          this.apiRequest.revenue = this.data.data.financials.annual.revenue;
          this.apiRequest.gross_margin = this.data.data.financials.annual.gross_margin;
          this.apiRequest.eps_diluted = this.data.data.financials.annual.eps_diluted;
          this.apiRequest.eps_diluted_growth = this.data.data.financials.annual.eps_diluted_growth;
          this.apiRequest.dividends_per_share_growth = this.data.data.financials.annual.dividends_per_share_growth;



          //Store Company In Our DataBase And Return Data From There
          this.http.post('http://beastmodeanalysis.com/api/keyStatistics', this.requestService.data).subscribe(res => {
            this.Data.next(res);
          }, console.error);

        }, console.error);

      } else {
        this.Data.next(res);
      }

    }, console.error);

  }// End of Get Data

  getCompanyData() {
    return this.Data.asObservable();
  }

}
