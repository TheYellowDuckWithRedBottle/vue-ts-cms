import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: HYRequestInterceptor<T>
  showLoading?: boolean
}
