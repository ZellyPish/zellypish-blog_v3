---
emoji: 🔍
title: Elasticsearch nori + ngram 토크나이징
date: '2022-02-11 21:30:00'
author: zellypish
tags: blog, Elasticsearch
categories: Troubleshooting
---

## Elasticsearch에서 nori와 ngram을 동시에 적용하다가...

Elasticsearch를 이용해 검색 서비스를 만들다가 이상한 점을 발견했습니다.

`마스크`로 검색했을 때 제가 원했던 동작은 `마스크`가 검색되고, `마스카라`, `크리스마스`는 검색 안되는 지극히 상식적인 검색결과 였습니다.

그런데 match operator를 AND로 줘도 자꾸
`Synonym(text:마 text:마스 text:스 text:스크 text:크)` 같이 SynonymQuery가 되어 온갖 단어가 다 검색되길래
삽질하며 원인을 찾아보았습니다.

기존에 생성되어있던 인덱스의 설정은 다음과 같았습니다.

```js
{
  "settings": {
    "analysis": {
      "analyzer": {
        "nori_a": {
            "tokenizer": "nori_t_discard",
            "filter": [
                "ngram_f"
                ]
        }
      },
      "tokenizer": {
          "nori_t_discard": {
              "type": "nori_tokenizer",
              "decompound_mode": "discard"
          }
      },
      "filter": {
        "ngram_f": {
          "type": "ngram",
          "min_gram": 1,
          "max_gram": 2
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "text": {
        "type": "text",
        "analyzer": "nori_a"
      }
    }
  }
}
```

해결책으로 ngram 필터를 빼보았더니 SynonymQuery가 없어지고 `(+text:마스크)` 가 되더라구요.
아마 ngram 필터가 동의어를 정의하는 식으로 동작하는 것 같았습니다.

그런데 ngram을 아예 빼고싶진 않았습니다. 이유는... `마스`를 검색해도 `마스크`가 나오게 하려면 `마스`도 토크나이징 될 필요가 있기 때문입니다..

해결책을 찾아보던 도중, ngram을 토크나이저로 쓰는 필드를 따로 만들어 multi_match를 하는 방법이 있다는 글을 보고 적용해봤습니다.

[elasticsearch에서 nori, ngram tokenizer를 동시에 활용하기](https://lamttic.github.io/2020/03/10/01.html)

```js
{
  "settings": {
    "analysis": {
      "analyzer": {
        "nori_a": {
          "tokenizer": "nori_t_discard"
        },
        "ngram_a": {
          "tokenizer": "ngram_t"
        }
      },
      "tokenizer": {
        "nori_t_discard": {
          "type": "nori_tokenizer",
          "decompound_mode": "discard"
        },
        "ngram_t": {
          "type": "ngram",
          "min_gram": 2,
          "max_gram": 3
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "text": {
        "type": "text",
        "analyzer": "nori_a"
      },
      "text_n": {
        "type": "text",
        "analyzer": "ngram_a"
      }
    }
  }
}
```

1글자로 검색 금지 조건이 달려있어서 ngram의 최소를 2, 최대를 3으로 줬습니다.

그리고 검색시 multi_match를 활용하여 노리를 쓰는 필드와 ngram을 쓰는 필드를 모두 검색했더니

```
((+text_n:마스 +text_n:마스크 +text_n:스크) | text:마스크)
```
원하는 결과가 나왔습니다.

예~ 신난다~

