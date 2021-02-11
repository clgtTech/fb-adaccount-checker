export interface ErrorPresenter {
  message: string;
  userTitle: string;
  userMessage: string;
}

export enum Locale {
  ruRU = 'ru-RU',
  enUS = 'en-US',
}

export enum AsyncActionStatus {
  idle = 'idle',
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export interface OperationResult {
  success: boolean;
}

export enum Task {
  MANAGE = 'MANAGE',
  CREATE_CONTENT = 'CREATE_CONTENT',
  MODERATE = 'MODERATE',
  MESSAGING = 'MESSAGING',
  ADVERTISE = 'ADVERTISE',
  ANALYZE = 'ANALYZE',
  MODERATE_COMMUNITY = 'MODERATE_COMMUNITY',
  MANAGE_JOBS = 'MANAGE_JOBS',
  PAGES_MESSAGING = 'PAGES_MESSAGING',
  PAGES_MESSAGING_SUBSCRIPTIONS = 'PAGES_MESSAGING_SUBSCRIPTIONS',
  READ_PAGE_MAILBOXES = 'READ_PAGE_MAILBOXES',
  VIEW_MONETIZATION_INSIGHTS = 'VIEW_MONETIZATION_INSIGHTS',
  MANAGE_LEADS = 'MANAGE_LEADS',
  PROFILE_PLUS_MANAGE = 'PROFILE_PLUS_MANAGE',
  PROFILE_PLUS_ANALYZE = 'PROFILE_PLUS_ANALYZE',
  PROFILE_PLUS_ADVERTISE = 'PROFILE_PLUS_ADVERTISE',
  PROFILE_PLUS_CREATE_CONTENT = 'PROFILE_PLUS_CREATE_CONTENT',
  PROFILE_PLUS_MODERATE = 'PROFILE_PLUS_MODERATE',
  PROFILE_PLUS_MESSAGING = 'PROFILE_PLUS_MESSAGING',
  CASHIER_ROLE = 'CASHIER_ROLE',
}

export enum Currency {
  DZD = 'DZD',
  ARS = 'ARS',
  AUD = 'AUD',
  BDT = 'BDT',
  BOB = 'BOB',
  BRL = 'BRL',
  GBP = 'GBP',
  CAD = 'CAD',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  CRC = 'CRC',
  CZK = 'CZK',
  DKK = 'DKK',
  EGP = 'EGP',
  EUR = 'EUR',
  GTQ = 'GTQ',
  HNL = 'HNL',
  HKD = 'HKD',
  HUF = 'HUF',
  ISK = 'ISK',
  INR = 'INR',
  IDR = 'IDR',
  ILS = 'ILS',
  JPY = 'JPY',
  KES = 'KES',
  KRW = 'KRW',
  MOP = 'MOP',
  MYR = 'MYR',
  MXN = 'MXN',
  NZD = 'NZD',
  NIO = 'NIO',
  NGN = 'NGN',
  NOK = 'NOK',
  PKR = 'PKR',
  PYG = 'PYG',
  PEN = 'PEN',
  PHP = 'PHP',
  PLN = 'PLN',
  QAR = 'QAR',
  RON = 'RON',
  RUB = 'RUB',
  SAR = 'SAR',
  SGD = 'SGD',
  ZAR = 'ZAR',
  SEK = 'SEK',
  CHF = 'CHF',
  TWD = 'TWD',
  THB = 'THB',
  TRY = 'TRY',
  AED = 'AED',
  USD = 'USD',
  UYU = 'UYU',
  VEF = 'VEF',
  VND = 'VND',
}

export enum AccountStatus {
  ACTIVE = 1,
  DISABLED = 2,
  UNSETTLED = 3,
  PENDING_RISK_REVIEW = 7,
  PENDING_SETTLEMENT = 8,
  IN_GRACE_PERIOD = 9,
  PENDING_CLOSURE = 100,
  CLOSED = 101,
  ANY_ACTIVE = 201,
  ANY_CLOSED = 202,
}

export enum AccountDisableReason {
  NONE = 0,
  ADS_INTEGRITY_POLICY = 1,
  ADS_IP_REVIEW = 2,
  RISK_PAYMENT = 3,
  GRAY_ACCOUNT_SHUT_DOWN = 4,
  ADS_AFC_REVIEW = 5,
  BUSINESS_INTEGRITY_RAR = 6,
  PERMANENT_CLOSE = 7,
  UNUSED_RESELLER_ACCOUNT = 8,
  UNUSED_ACCOUNT = 9,
}

export enum Status {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
}

export enum CampaignEffectiveStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
  IN_PROCESS = 'IN_PROCESS',
  WITH_ISSUES = 'WITH_ISSUES',
}

export enum AdsetEffectiveStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DELETED = 'DELETED',
  CAMPAIGN_PAUSED = 'CAMPAIGN_PAUSED',
  ARCHIVED = 'ARCHIVED',
  IN_PROCESS = 'IN_PROCESS',
  WITH_ISSUES = 'WITH_ISSUES',
}

export enum AdEffectiveStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DELETED = 'DELETED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  DISAPPROVED = 'DISAPPROVED',
  PREAPPROVED = 'PREAPPROVED',
  PENDING_BILLING_INFO = 'PENDING_BILLING_INFO',
  CAMPAIGN_PAUSED = 'CAMPAIGN_PAUSED',
  ARCHIVED = 'ARCHIVED',
  ADSET_PAUSED = 'ADSET_PAUSED',
  IN_PROCESS = 'IN_PROCESS',
  WITH_ISSUES = 'WITH_ISSUES',
}

export enum BidStrategy {
  LOWEST_COST_WITHOUT_CAP = 'LOWEST_COST_WITHOUT_CAP',
  LOWEST_COST_WITH_BID_CAP = 'LOWEST_COST_WITH_BID_CAP',
  COST_CAP = 'COST_CAP',
  LOWEST_COST_WITH_MIN_ROAS = 'LOWEST_COST_WITH_MIN_ROAS',
}

export enum BuyingType {
  AUCTION = 'AUCTION',
  RESERVED = 'RESERVED',
}

export enum Objective {
  APP_INSTALLS = 'APP_INSTALLS',
  BRAND_AWARENESS = 'BRAND_AWARENESS',
  CONVERSIONS = 'CONVERSIONS',
  EVENT_RESPONSES = 'EVENT_RESPONSES',
  LEAD_GENERATION = 'LEAD_GENERATION',
  LINK_CLICKS = 'LINK_CLICKS',
  LOCAL_AWARENESS = 'LOCAL_AWARENESS',
  MESSAGES = 'MESSAGES',
  OFFER_CLAIMS = 'OFFER_CLAIMS',
  PAGE_LIKES = 'PAGE_LIKES',
  POST_ENGAGEMENT = 'POST_ENGAGEMENT',
  PRODUCT_CATALOG_SALES = 'PRODUCT_CATALOG_SALES',
  REACH = 'REACH',
  SOCIAL_INTERACTION = 'SOCIAL_INTERACTION',
  STORE_VISITS = 'STORE_VISITS',
  VIDEO_VIEWS = 'VIDEO_VIEWS',
}

export enum ActionAttributionWindows {
  '1D_VIEW' = '1d_view',
  '7D_VIEW' = '7d_view',
  '28D_VIEW' = '28d_view',
  '1D_CLICK' = '1d_click',
  '7D_CLICK' = '7d_click',
  '28D_CLICK' = '28d_click',
  DDA = 'dda',
  DEFAULT = 'default',
}

export enum ActionType {
  APP_CUSTOM_EVENT_FB_MOBILE_ACHIEVEMENT_UNLOCKED = 'app_custom_event.fb_mobile_achievement_unlocked',
  APP_CUSTOM_EVENT_FB_MOBILE_ACTIVATE_APP = 'app_custom_event.fb_mobile_activate_app',
  APP_CUSTOM_EVENT_FB_MOBILE_ADD_PAYMENT_INFO = 'app_custom_event.fb_mobile_add_payment_info',
  APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_CART = 'app_custom_event.fb_mobile_add_to_cart',
  APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_WISHLIST = 'app_custom_event.fb_mobile_add_to_wishlist',
  APP_CUSTOM_EVENT_FB_MOBILE_COMPLETE_REGISTRATION = 'app_custom_event.fb_mobile_complete_registration',
  APP_CUSTOM_EVENT_FB_MOBILE_CONTENT_VIEW = 'app_custom_event.fb_mobile_content_view',
  APP_CUSTOM_EVENT_FB_MOBILE_INITIATED_CHECKOUT = 'app_custom_event.fb_mobile_initiated_checkout',
  APP_CUSTOM_EVENT_FB_MOBILE_LEVEL_ACHIEVED = 'app_custom_event.fb_mobile_level_achieved',
  APP_CUSTOM_EVENT_FB_MOBILE_RATE = 'app_custom_event.fb_mobile_rate',
  APP_CUSTOM_EVENT_FB_MOBILE_SEARCH = 'app_custom_event.fb_mobile_search',
  APP_CUSTOM_EVENT_FB_MOBILE_SPENT_CREDITS = 'app_custom_event.fb_mobile_spent_credits',
  APP_CUSTOM_EVENT_FB_MOBILE_TUTORIAL_COMPLETION = 'app_custom_event.fb_mobile_tutorial_completion',
  APP_CUSTOM_EVENT_OTHER = 'app_custom_event.other',
  APP_INSTALL = 'app_install',
  APP_USE = 'app_use',
  CHECKIN = 'checkin',
  POST_COMMENT = 'comment',
  CREDIT_SPENT = 'credit_spent',
  GAME_PLAYS = 'games.plays',
  LANDING_PAGE_VIEW = 'landing_page_view',
  LIKE = 'like',
  LINK_CLICK = 'link_click',
  MOBILE_APP_INSTALL = 'mobile_app_install',
  OFFSITE_CONVERSION_FB_PIXEL_ADD_PAYMENT_INFO = 'offsite_conversion.fb_pixel_add_payment_info',
  OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_CART = 'offsite_conversion.fb_pixel_add_to_cart',
  OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_WISHLIST = 'offsite_conversion.fb_pixel_add_to_wishlist',
  OFFSITE_CONVERSION_FB_PIXEL_COMPLETE_REGISTRATION = 'offsite_conversion.fb_pixel_complete_registration',
  OFFSITE_CONVERSION_FB_PIXEL_CUSTOM = 'offsite_conversion.fb_pixel_custom',
  OFFSITE_CONVERSION_FB_PIXEL_INITIATE_CHECKOUT = 'offsite_conversion.fb_pixel_initiate_checkout',
  OFFSITE_CONVERSION_FB_PIXEL_LEAD = 'offsite_conversion.fb_pixel_lead',
  OFFSITE_CONVERSION_FB_PIXEL_PURCHASE = 'offsite_conversion.fb_pixel_purchase',
  OFFSITE_CONVERSION_FB_PIXEL_SEARCH = 'offsite_conversion.fb_pixel_search',
  OFFSITE_CONVERSION_FB_PIXEL_VIEW_CONTENT = 'offsite_conversion.fb_pixel_view_content',
  ONSITE_CONVERSION_FLOW_COMPLETE = 'onsite_conversion.flow_complete',
  ONSITE_CONVERSION_MESSAGING_BLOCK = 'onsite_conversion.messaging_block',
  ONSITE_CONVERSION_MESSAGING_CONVERSATION_STARTED_7D = 'onsite_conversion.messaging_conversation_started_7d',
  ONSITE_CONVERSION_MESSAGING_FIRST_REPLY = 'onsite_conversion.messaging_first_reply',
  ONSITE_CONVERSION_POST_SAVE = 'onsite_conversion.post_save',
  ONSITE_CONVERSION_PURCHASE = 'onsite_conversion.purchase',
  OUTBOUND_CLICK = 'outbound_click',
  PHOTO_VIEW = 'photo_view',
  POST = 'post',
  POST_REACTION = 'post_reaction',
  RSVP = 'rsvp',
  VIDEO_VIEW = 'video_view',
  PAGE_ENGAGEMENT = 'page_engagement',
  POST_ENGAGEMENT = 'post_engagement',
  OFFSITE_CONVERSION = 'offsite_conversion',
  ONSITE_CONVERSION = 'onsite_conversion',
  APP_CUSTOM_EVENT = 'app_custom_event',
  ADD_TO_CART = 'add_to_cart',
  COMPLETE_REGISTRATION = 'complete_registration',
  PURCHASE = 'purchase',
  ONSITE_CONVERSION_LEAD_GROUPED = 'onsite_conversion.lead_grouped',
  VIEW_CONTENT = 'view_content',
  INITIATE_CHECKOUT = 'initiate_checkout',
  ADD_PAYMENT_INFO = 'add_payment_info',
  ADD_TO_WISHLIST = 'add_to_wishlist',
  LEAD = 'lead',
  LEADGEN_GROUPED = 'leadgen_grouped',
  OMNI_APP_INSTALL = 'omni_app_install',
  OMNI_PURCHASE = 'omni_purchase',
  OMNI_ADD_TO_CART = 'omni_add_to_cart',
  OMNI_COMPLETE_REGISTRATION = 'omni_complete_registration',
  OMNI_VIEW_CONTENT = 'omni_view_content',
  OMNI_SEARCH = 'omni_search',
  OMNI_INITIATED_CHECKOUT = 'omni_initiated_checkout',
  OMNI_ACHIEVEMENT_UNLOCKED = 'omni_achievement_unlocked',
  OMNI_ACTIVATE_APP = 'omni_activate_app',
  OMNI_LEVEL_ACHIEVED = 'omni_level_achieved',
  OMNI_RATE = 'omni_rate',
  OMNI_SPEND_CREDITS = 'omni_spend_credits',
  OMNI_TUTORIAL_COMPLETION = 'omni_tutorial_completion',
  OMNI_CUSTOM = 'omni_custom',
  SUBSCRIBE = 'subscribe',
}

export type ActionIndicator = `actions:${ActionType}`;

export enum CommentsOrder {
  CHRONOLOGICAL = 'chronological',
  REVERSE_CHRONOLOGICAL = 'reverse_chronological',
}

export enum CommentFilter {
  ALL = 'all',
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

export enum BudgetType {
  DAILY = 'daily',
  LIFETIME = 'lifetime',
}
