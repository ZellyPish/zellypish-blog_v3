---
emoji: ๐
title: Elasticsearch nori + ngram ํ ํฌ๋์ด์ง
date: '2022-02-11 21:30:00'
author: zellypish
tags: 
  - blog
  - Elasticsearch
categories: Troubleshooting
---
## Elasticsearch์์ nori์ ngram์ ๋์์ ์ ์ฉํ๋ค๊ฐ...

Elasticsearch๋ฅผ ์ด์ฉํด ๊ฒ์ ์๋น์ค๋ฅผ ๋ง๋ค๋ค๊ฐ ์ด์ํ ์ ์ ๋ฐ๊ฒฌํ์ต๋๋ค.

`๋ง์คํฌ`๋ก ๊ฒ์ํ์ ๋ ์ ๊ฐ ์ํ๋ ๋์์ `๋ง์คํฌ`๊ฐ ๊ฒ์๋๊ณ , `๋ง์ค์นด๋ผ`, `ํฌ๋ฆฌ์ค๋ง์ค`๋ ๊ฒ์ ์๋๋ ์ง๊ทนํ ์์์ ์ธ ๊ฒ์๊ฒฐ๊ณผ ์์ต๋๋ค.

๊ทธ๋ฐ๋ฐ match operator๋ฅผ AND๋ก ์ค๋ ์๊พธ
`Synonym(text:๋ง text:๋ง์ค text:์ค text:์คํฌ text:ํฌ)` ๊ฐ์ด SynonymQuery๊ฐ ๋์ด ์จ๊ฐ ๋จ์ด๊ฐ ๋ค ๊ฒ์๋๊ธธ๋
์ฝ์งํ๋ฉฐ ์์ธ์ ์ฐพ์๋ณด์์ต๋๋ค.

๊ธฐ์กด์ ์์ฑ๋์ด์๋ ์ธ๋ฑ์ค์ ์ค์ ์ ๋ค์๊ณผ ๊ฐ์์ต๋๋ค.

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

ํด๊ฒฐ์ฑ์ผ๋ก ngram ํํฐ๋ฅผ ๋นผ๋ณด์๋๋ SynonymQuery๊ฐ ์์ด์ง๊ณ  `(+text:๋ง์คํฌ)` ๊ฐ ๋๋๋ผ๊ตฌ์.
์๋ง ngram ํํฐ๊ฐ ๋์์ด๋ฅผ ์ ์ํ๋ ์์ผ๋ก ๋์ํ๋ ๊ฒ ๊ฐ์์ต๋๋ค.

๊ทธ๋ฐ๋ฐ ngram์ ์์ ๋นผ๊ณ ์ถ์ง ์์์ต๋๋ค. ์ด์ ๋... `๋ง์ค`๋ฅผ ๊ฒ์ํด๋ `๋ง์คํฌ`๊ฐ ๋์ค๊ฒ ํ๋ ค๋ฉด `๋ง์ค`๋ ํ ํฌ๋์ด์ง ๋  ํ์๊ฐ ์๊ธฐ ๋๋ฌธ์๋๋ค..

ํด๊ฒฐ์ฑ์ ์ฐพ์๋ณด๋ ๋์ค, ngram์ ํ ํฌ๋์ด์ ๋ก ์ฐ๋ ํ๋๋ฅผ ๋ฐ๋ก ๋ง๋ค์ด multi_match๋ฅผ ํ๋ ๋ฐฉ๋ฒ์ด ์๋ค๋ ๊ธ์ ๋ณด๊ณ  ์ ์ฉํด๋ดค์ต๋๋ค.

[elasticsearch์์ nori, ngram tokenizer๋ฅผ ๋์์ ํ์ฉํ๊ธฐ](https://lamttic.github.io/2020/03/10/01.html)

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

1๊ธ์๋ก ๊ฒ์ ๊ธ์ง ์กฐ๊ฑด์ด ๋ฌ๋ ค์์ด์ ngram์ ์ต์๋ฅผ 2, ์ต๋๋ฅผ 3์ผ๋ก ์คฌ์ต๋๋ค.

๊ทธ๋ฆฌ๊ณ  ๊ฒ์์ multi_match๋ฅผ ํ์ฉํ์ฌ ๋ธ๋ฆฌ๋ฅผ ์ฐ๋ ํ๋์ ngram์ ์ฐ๋ ํ๋๋ฅผ ๋ชจ๋ ๊ฒ์ํ๋๋

```
((+text_n:๋ง์ค +text_n:๋ง์คํฌ +text_n:์คํฌ) | text:๋ง์คํฌ)
```
์ํ๋ ๊ฒฐ๊ณผ๊ฐ ๋์์ต๋๋ค.

์~ ์ ๋๋ค~

