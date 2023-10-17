```
// 获取当前设备支持语言数组        
NSArray *arr = [NSLocale availableLocaleIdentifiers];        
[arr enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {        
NSLocale *local =[[NSLocale alloc] initWithLocaleIdentifier:obj];        
NSLocale *chineseLocal = [[NSLocale alloc] initWithLocaleIdentifier:@"zh_CN"];        
NSString *chineseLanguage = [chineseLocal displayNameForKey:NSLocaleIdentifier value:obj];        
NSLocale *englishLocal = [[NSLocale alloc] initWithLocaleIdentifier:@"en-US"];        
NSString *englishLanguage = [englishLocal displayNameForKey:NSLocaleIdentifier value:obj];        
NSString *currencySymbol = local.currencySymbol;        
NSString *countryCode = local.countryCode;        
NSLog(@"%@-%@-%@-%@-%@", obj, chineseLanguage, englishLanguage, currencySymbol, countryCode);        
}];
```        
国家与地区缩写
***
英文    中文   域名缩写  电话代码
Angola  安哥拉  AO  244
Afghanistan  阿富汗  AF  93
Albania  阿尔巴尼亚  AL  355
Algeria  阿尔及利亚  DZ  213
Andorra  安道尔共和国  AD  376
Anguilla  安圭拉岛  AI  1264
Antigua and Barbuda  安提瓜和巴布达  AG  1268
Argentina  阿根廷  AR  54
Armenia  亚美尼亚  AM  374
Ascension  阿森松  -  247
Australia  澳大利亚  AU  61
Austria  奥地利  AT  43
Azerbaijan  阿塞拜疆  AZ  994
Bahamas  巴哈马  BS  1242
Bahrain  巴林  BH  973
Bangladesh  孟加拉国  BD  880
Barbados  巴巴多斯  BB  1246
Belarus  白俄罗斯  BY  375
Belgium  比利时  BE  32
Belize  伯利兹  BZ  501
Benin  贝宁  BJ  229
BermudaIs.  百慕大群岛  BM  1441
Bolivia  玻利维亚  BO  591
Botswana  博茨瓦纳  BW  267
Brazil  巴西  BR  55
Brunei  文莱  BN  673
Bulgaria  保加利亚  BG  359
Burkina-faso  布基纳法索  BF  226
Burma  缅甸  MM  95
Burundi  布隆迪  BI  257
Cameroon  喀麦隆  CM  237
Canada  加拿大  CA  1
Cayman Is.  开曼群岛  -  1345
Central African Republic  中非共和国  CF  236
Chad  乍得  TD  235
Chile  智利  CL  56
China  中国  CN  86
Colombia  哥伦比亚  CO  57
Congo  刚果  CG  242
Cook Is.  库克群岛  CK  682
Costa Rica  哥斯达黎加  CR  506
Cuba  古巴  CU  53
Cyprus  塞浦路斯  CY  357
Czech Republic  捷克  CZ  420
Denmark  丹麦  DK  45
Djibouti  吉布提  DJ  253
Dominica Rep.  多米尼加共和国  DO  1890
Ecuador  厄瓜多尔  EC  593
Egypt  埃及  EG  20
EISalvador  萨尔瓦多  SV  503
Estonia  爱沙尼亚  EE  372
Ethiopia  埃塞俄比亚  ET  251
Fiji  斐济  FJ  679
Finland  芬兰  FI  358
France  法国  FR  33
French Guiana  法属圭亚那  GF  594
Gabon  加蓬  GA  241
Gambia  冈比亚  GM  220
Georgia  格鲁吉亚  GE  995
Germany  德国  DE  49
Ghana  加纳  GH  233
Gibraltar  直布罗陀  GI  350
Greece  希腊  GR  30
Grenada  格林纳达  GD  1809
Guam  关岛  GU  1671
Guatemala  危地马拉  GT  502
Guinea  几内亚  GN  224
Guyana  圭亚那  GY  592
Haiti  海地  HT  509
Honduras  洪都拉斯  HN  504
Hongkong  香港  HK  852
Hungary  匈牙利  HU  36
Iceland  冰岛  IS  354
India  印度  IN  91
Indonesia  印度尼西亚  ID  62
Iran  伊朗  IR  98
Iraq  伊拉克  IQ  964
Ireland  爱尔兰  IE  353
Israel  以色列  IL  972
Italy  意大利  IT  39
IvoryCoast  科特迪瓦  -  225
Jamaica  牙买加  JM  1876
Japan  日本  JP  81
Jordan  约旦  JO  962
Kampuchea (Cambodia )  柬埔寨  KH  855
Kazakstan  哈萨克斯坦  KZ  327
Kenya  肯尼亚  KE  254
Korea  韩国  KR  82
Kuwait  科威特  KW  965
Kyrgyzstan  吉尔吉斯坦  KG  331
Laos  老挝  LA  856
Latvia  拉脱维亚  LV  371
Lebanon  黎巴嫩  LB  961
Lesotho  莱索托  LS  266
Liberia  利比里亚  LR  231
Libya  利比亚  LY  218
Liechtenstein  列支敦士登  LI  423
Lithuania  立陶宛  LT  370
Luxembourg  卢森堡  LU  352
Macao  澳门  MO  853
Madagascar  马达加斯加  MG  261
Malawi  马拉维  MW  265
Malaysia  马来西亚  MY  60
Maldives  马尔代夫  MV  960
Mali  马里  ML  223
Malta  马耳他  MT  356
Mariana Is  马里亚那群岛  -  1670
Martinique  马提尼克  -  596
Mauritius  毛里求斯  MU  230
Mexico  墨西哥  MX  52
Moldova, Republic of  摩尔多瓦  MD  373
Monaco  摩纳哥  MC  377
Mongolia  蒙古  MN  976
Montserrat Is  蒙特塞拉特岛  MS  1664
Morocco  摩洛哥  MA  212
Mozambique  莫桑比克  MZ  258
Namibia  纳米比亚  NA  264
Nauru  瑙鲁  NR  674
Nepal  尼泊尔  NP  977
Netheriands Antilles  荷属安的列斯  -  599
Netherlands  荷兰  NL  31
NewZealand  新西兰  NZ  64
Nicaragua  尼加拉瓜  NI  505
Niger  尼日尔  NE  227
Nigeria  尼日利亚  NG  234
North Korea  朝鲜  KP  850
Norway  挪威  NO  47
Oman  阿曼  OM  968
Pakistan  巴基斯坦  PK  92
Panama  巴拿马  PA  507
Papua New Cuinea  巴布亚新几内亚  PG  675
Paraguay  巴拉圭  PY  595
Peru  秘鲁  PE  51
Philippines  菲律宾  PH  63
Poland  波兰  PL  48
French Polynesia  法属玻利尼西亚  PF  689
Portugal  葡萄牙  PT  351
PuertoRico  波多黎各  PR  1787
Qatar  卡塔尔  QA  974
Reunion  留尼旺  -  262
Romania  罗马尼亚  RO  40
Russia  俄罗斯  RU  7
Saint Lueia  圣卢西亚  LC  1758
Saint Vincent  圣文森特岛  VC  1784
Samoa Eastern  东萨摩亚(美)  -  684
Samoa Western  西萨摩亚  -  685
San Marino  圣马力诺  SM  378
Sao Tome and Principe  圣多美和普林西比  ST  239
Saudi Arabia  沙特阿拉伯  SA  966
Senegal  塞内加尔  SN  221
Seychelles  塞舌尔  SC  248
Sierra Leone  塞拉利昂  SL  232
Singapore  新加坡  SG  65
Slovakia  斯洛伐克  SK  421
Slovenia  斯洛文尼亚  SI  386
Solomon Is  所罗门群岛  SB  677
Somali  索马里  SO  252
South Africa  南非  ZA  27
Spain  西班牙  ES  34
Sri Lanka  斯里兰卡  LK  94
St.Lucia  圣卢西亚  LC  1758
St.Vincent  圣文森特  VC  1784
Sudan  苏丹  SD  249
Suriname  苏里南  SR  597
Swaziland  斯威士兰  SZ  268
Sweden  瑞典  SE  46
Switzerland  瑞士  CH  41
Syria  叙利亚  SY  963
Taiwan  台湾省  TW  886
Tajikstan  塔吉克斯坦  TJ  992
Tanzania  坦桑尼亚  TZ  255
Thailand  泰国  TH  66
Togo  多哥  TG  228
Tonga  汤加  TO  676
Trinidad and Tobago  特立尼达和多巴哥  TT  1809
Tunisia  突尼斯  TN  216
Turkey  土耳其  TR  90
Turkmenistan  土库曼斯坦  TM  993
Uganda  乌干达  UG  256
Ukraine  乌克兰  UA  380
United Arab Emirates  阿拉伯联合酋长国  AE  971
United Kiongdom  英国  GB/UK  44
United States of America  美国  US  1
Uruguay  乌拉圭  UY  598
Uzbekistan  乌兹别克斯坦  UZ  233
Venezuela  委内瑞拉  VE  58
Vietnam  越南  VN  84
Yemen  也门  YE  967
Yugoslavia  南斯拉夫  YU  381
Zimbabwe  津巴布韦  ZW  263
Zaire  扎伊尔  ZR  243
Zambia  赞比亚  ZM  260
 
 
各国语言缩写
***
en 英文
en_US 英文 (美国)
ar 阿拉伯文
ar_AE 阿拉伯文 (阿拉伯联合酋长国)
ar_BH 阿拉伯文 (巴林)
ar_DZ 阿拉伯文 (阿尔及利亚)
ar_EG 阿拉伯文 (埃及)
ar_IQ 阿拉伯文 (伊拉克)
ar_JO 阿拉伯文 (约旦)
ar_KW 阿拉伯文 (科威特)
ar_LB 阿拉伯文 (黎巴嫩)
ar_LY 阿拉伯文 (利比亚)
ar_MA 阿拉伯文 (摩洛哥)
ar_OM 阿拉伯文 (阿曼)
ar_QA 阿拉伯文 (卡塔尔)
ar_SA 阿拉伯文 (沙特阿拉伯)
ar_SD 阿拉伯文 (苏丹)
ar_SY 阿拉伯文 (叙利亚)
ar_TN 阿拉伯文 (突尼斯)
ar_YE 阿拉伯文 (也门)
be 白俄罗斯文
be_BY 白俄罗斯文 (白俄罗斯)
bg 保加利亚文
bg_BG 保加利亚文 (保加利亚)
ca 加泰罗尼亚文
ca_ES 加泰罗尼亚文 (西班牙)
ca_ES_EURO 加泰罗尼亚文 (西班牙,Euro)
cs 捷克文
cs_CZ 捷克文 (捷克共和国)
da 丹麦文
da_DK 丹麦文 (丹麦)
de 德文
de_AT 德文 (奥地利)
de_AT_EURO 德文 (奥地利,Euro)
de_CH 德文 (瑞士)
de_DE 德文 (德国)
de_DE_EURO 德文 (德国,Euro)
de_LU 德文 (卢森堡)
de_LU_EURO 德文 (卢森堡,Euro)
el 希腊文
el_GR 希腊文 (希腊)
en_AU 英文 (澳大利亚)
en_CA 英文 (加拿大)
en_GB 英文 (英国)
en_IE 英文 (爱尔兰)
en_IE_EURO 英文 (爱尔兰,Euro)
en_NZ 英文 (新西兰)
en_ZA 英文 (南非)
es 西班牙文
es_BO 西班牙文 (玻利维亚)
es_AR 西班牙文 (阿根廷)
es_CL 西班牙文 (智利)
es_CO 西班牙文 (哥伦比亚)
es_CR 西班牙文 (哥斯达黎加)
es_DO 西班牙文 (多米尼加共和国)
es_EC 西班牙文 (厄瓜多尔)
es_ES 西班牙文 (西班牙)
es_ES_EURO 西班牙文 (西班牙,Euro)
es_GT 西班牙文 (危地马拉)
es_HN 西班牙文 (洪都拉斯)
es_MX 西班牙文 (墨西哥)
es_NI 西班牙文 (尼加拉瓜)
et 爱沙尼亚文
es_PA 西班牙文 (巴拿马)
es_PE 西班牙文 (秘鲁)
es_PR 西班牙文 (波多黎哥)
es_PY 西班牙文 (巴拉圭)
es_SV 西班牙文 (萨尔瓦多)
es_UY 西班牙文 (乌拉圭)
es_VE 西班牙文 (委内瑞拉)
et_EE 爱沙尼亚文 (爱沙尼亚)
fi 芬兰文
fi_FI 芬兰文 (芬兰)
fi_FI_EURO 芬兰文 (芬兰,Euro)
fr 法文
fr_BE 法文 (比利时)
fr_BE_EURO 法文 (比利时,Euro)
fr_CA 法文 (加拿大)
fr_CH 法文 (瑞士)
fr_FR 法文 (法国)
fr_FR_EURO 法文 (法国,Euro)
fr_LU 法文 (卢森堡)
fr_LU_EURO 法文 (卢森堡,Euro)
hr 克罗地亚文
hr_HR 克罗地亚文 (克罗地亚)
hu 匈牙利文
hu_HU 匈牙利文 (匈牙利)
is 冰岛文
is_IS 冰岛文 (冰岛)
it 意大利文
it_CH 意大利文 (瑞士)
it_IT 意大利文 (意大利)
it_IT_EURO 意大利文 (意大利,Euro)
iw 希伯来文
iw_IL 希伯来文 (以色列)
ja 日文
ja_JP 日文 (日本)
ko 朝鲜文
ko_KR 朝鲜文 (南朝鲜)
lt 立陶宛文
lt_LT 立陶宛文 (立陶宛)
lv 拉托维亚文(列托)
lv_LV 拉托维亚文(列托) (拉脱维亚)
mk 马其顿文
mk_MK 马其顿文 (马其顿王国)
nl 荷兰文
nl_BE 荷兰文 (比利时)
nl_BE_EURO 荷兰文 (比利时,Euro)
nl_NL 荷兰文 (荷兰)
nl_NL_EURO 荷兰文 (荷兰,Euro)
no 挪威文
no_NO 挪威文 (挪威)
no_NO_NY 挪威文 (挪威,Nynorsk)
pl 波兰文
pl_PL 波兰文 (波兰)
pt 葡萄牙文
pt_BR 葡萄牙文 (巴西)
pt_PT 葡萄牙文 (葡萄牙)
pt_PT_EURO 葡萄牙文 (葡萄牙,Euro)
ro 罗马尼亚文
ro_RO 罗马尼亚文 (罗马尼亚)
ru 俄文
ru_RU 俄文 (俄罗斯)
sh 塞波尼斯-克罗地亚文
sh_YU 塞波尼斯-克罗地亚文 (南斯拉夫)
sk 斯洛伐克文
sk_SK 斯洛伐克文 (斯洛伐克)
sl 斯洛文尼亚文
sl_SI 斯洛文尼亚文 (斯洛文尼亚)
sq 阿尔巴尼亚文
sq_AL 阿尔巴尼亚文 (阿尔巴尼亚)
sr 塞尔维亚文
sr_YU 塞尔维亚文 (南斯拉夫)
sv 瑞典文
sv_SE 瑞典文 (瑞典)
th 泰文
th_TH 泰文 (泰国)
tr 土耳其文
tr_TR 土耳其文 (土耳其)
uk 乌克兰文
uk_UA 乌克兰文 (乌克兰)
zh 中文
zh_CN 中文 (中国)
zh_HK 中文 (香港)
zh_TW 中文 (台湾)

Locale Description // Short String //  Hex Value //  Decimal Value
Chinese-China // zh-cn // 0x0804 // 2052
Chinese-Taiwan // zh-tw // 0x0404 // 1028
English-United States // en-us // 0x0409 // 1033
Afrikaans // af // 0x0436 // 1078
Albanian // sq // 0x041C // 1052
Arabic-United Arab Emirates // ar-ae // 0x3801 // 14337
Arabic-Bahrain // ar-bh // 0x3C01 // 15361
Arabic-Algeria // ar-dz // 0x1401 // 5121
Arabic-Egypt // ar-eg // 0x0C01 // 3073
Arabic-Iraq // ar-iq // 0x0801 // 2049
Arabic-Jordan // ar-jo // 0x2C01 // 11265
Arabic-Kuwait // ar-kw // 0x3401 // 13313
Arabic-Lebanon // ar-lb // 0x3001 // 12289
Arabic-Libya // ar-ly // 0x1001 // 4097
Arabic-Morocco // ar-ma // 0x1801 // 6145
Arabic-Oman // ar-om // 0x2001 // 8193
Arabic-Qata // ar-qa // 0x4001 // 16385
Arabic-Saudi Arabia // ar-sa // 0x0401 // 1025
Arabic-Syria // ar-sy // 0x2801 // 10241
Arabic-Tunisia // ar-tn // 0x1C01 // 7169
Arabic-Yemen // ar-ye // 0x2401 // 9217
Armenian // hy // 0x042B // 1067
Azeri-Latin // az-az // 0x042C // 1068
Azeri-Cyrillic // az-az // 0x082C // 2092
Basque // eu // 0x042D // 1069
Belarusian // be // 0x0423 // 1059
Bulgarian // bg // 0x0402 // 1026
Catalan // ca // 0x0403 // 1027
Chinese-China // zh-cn // 0x0804 // 2052
Chinese-Hong Kong SAR // zh-hk // 0x0C04 // 3076
Chinese-Macau SAR // zh-mo // 0x1404 // 5124
Chinese-Singapore // zh-sg // 0x1004 // 4100
Chinese-Taiwan // zh-tw // 0x0404 // 1028
Croatian // hr // 0x041A // 1050
Czech // cs // 0x0405 // 1029
Danish // da // 0x0406 // 1030
Dutch-The Netherlands // nl-nl // 0x0413 // 1043
Dutch-Belgium // nl-be // 0x0813 // 2067
English-Australia // en-au // 0x0C09 // 3081
English-Belize // en-bz // 0x2809 // 10249
English-Canada // en-ca // 0x1009 // 4105
English-Caribbean // en-cb // 0x2409 // 9225
English-Ireland // en-ie // 0x1809 // 6153
English-Jamaica // en-jm // 0x2009 // 8201
English-New Zealand // en-nz // 0x1409 // 5129
English-Phillippines // en-ph // 0x3409 // 13321
English-South Africa // en-za // 0x1C09 // 7177
English-Trinidad // en-tt // 0x2C09 // 11273
English-United Kingdom // en-gb // 0x0809 // 2057
English-United States // en-us // 0x0409 // 1033
Estonian // et // 0x0425 // 1061
Fars // fa // 0x0429 // 1065
Finnish // fi // 0x040B // 1035
Faroese // fo // 0x0438 // 1080
French-France // fr-fr // 0x040C // 1036
French-Belgium // fr-be // 0x080C // 2060
French-Canada // fr-ca // 0x0C0C // 3084
French-Luxembourg // fr-lu // 0x140C // 5132
French-Switzerland // fr-ch // 0x100C // 4108
Gaelic-Ireland // gd-ie // 0x083C // 2108
Gaelic-Scotland // gd // 0x043C // 1084
German-Germany // de-de // 0x0407 // 1031
German-Austria // de-at // 0x0C07 // 3079
German-Liechtenstein // de-li // 0x1407 // 5127
German-Luxembourg // de-lu // 0x1007 // 4103
German-Switzerland // de-ch // 0x0807 // 2055
Greek // el // 0x0408 // 1032
Hebrew // he // 0x040D // 1037
Hindi // hi // 0x0439 // 1081
Hungarian // hu // 0x040E // 1038
Icelandic // is // 0x040F // 1039
Indonesian // id // 0x0421 // 1057
Italian-Italy // it-it // 0x0410 // 1040
Italian-Switzerland // it-ch // 0x0810 // 2064
Japanese // ja // 0x0411 // 1041
Korean // ko // 0x0412 // 1042
Latvian // lv // 0x0426 // 1062
Lithuanian // lt // 0x0427 // 1063
FYRO Macedonian // mk // 0x042F // 1071
Malay-Malaysia // ms-my // 0x043E // 1086
Malay–Brunei // ms-bn // 0x083E // 2110
Maltese // mt // 0x043A // 1082
Marathi // mr // 0x044E // 1102
Norwegian-Bokmål // no-no // 0x0414 // 1044
Norwegian-Nynorsk // no-no // 0x0814 // 2068
Polish // pl // 0x0415 // 1045
Portuguese-Portugal // pt-pt // 0x0816 // 2070
Portuguese-Brazil // pt-br // 0x0416 // 1046
Raeto-Romance // rm // 0x0417 // 1047
Romanian-Romania // ro // 0x0418 // 1048
Romanian-Moldova // ro-mo // 0x0818 // 2072
Russian // ru // 0x0419 // 1049
Russian-Moldova // ru-mo // 0x0819 // 2073
Sanskrit // sa // 0x044F // 1103
Serbian-Cyrillic // sr-sp // 0x0C1A // 3098
Serbian-Latin // sr-sp // 0x081A // 2074
Setsuana // tn // 0x0432 // 1074
Slovenian // sl // 0x0424 // 1060
Slovak // sk // 0x041B // 1051
Sorbian // sb 0x042E // 1070
Spanish-Spain // es-es // 0x0C0A // 1034
Spanish-Argentina // es-ar // 0x2C0A // 11274
Spanish-Bolivia // es-bo // 0x400A // 16394
Spanish-Chile // es-cl // 0x340A // 13322
Spanish-Colombia // es-co // 0x240A // 9226
Spanish-Costa Rica // es-cr // 0x140A // 5130
Spanish-Dominican Republic // es-do // 0x1C0A // 7178
Spanish-Ecuador // es-ec // 0x300A // 12298
Spanish-Guatemala // es-gt // 0x100A // 4106
Spanish-Honduras // es-hn // 0x480A // 18442
Spanish-Mexico // es-mx 0x080A  2058
Spanish-Nicaragua // es-ni // 0x4C0A // 19466
Spanish-Panama // es-pa // 0x180A // 6154
Spanish-Peru // es-pe // 0x280A // 10250
Spanish-Puerto Rico // es-pr // 0x500A // 20490
Spanish-Paraguay // es-py // 0x3C0A // 15370
Spanish-El Salvador // es-sv // 0x440A // 17418
Spanish-Uruguay // es-uy // 0x380A // 14346
Spanish-Venezuela // es-ve // 0x200A // 8202
Sutu // sx // 0x0430 // 1072
Swahili // sw // 0x0441 // 1089
Swedish-Sweden // sv-se // 0x041D // 1053
Swedish-Finland // sv-fi // 0x081D // 2077
Tamil // ta // 0x0449 // 1097
Tatar // tt // 0X0444 // 1092
Thai // th // 0x041E // 1054
Turkish // tr // 0x041F // 1055
Tsonga // ts // 0x0431 // 1073
Ukrainian // uk // 0x0422 // 1058
Urdu // ur // 0x0420 // 1056
Uzbek-Cyrillic // uz-uz // 0x0843 // 2115
Uzbek–Latin // uz-uz // 0x0443 // 1091
Vietnamese // vi // 0x042A // 1066
Xhosa // xh // 0x0434 // 1076
Yiddish // yi // 0x043D // 1085
Zulu // zu // 0x0435 // 1077

