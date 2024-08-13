#!/bin/sh

if [ -z "$1" ]; then
  echo "Uso: $0 parametro"
  exit 1
fi

case $1 in
  5600)
    url="https://lista.mercadolivre.com.br/informatica/componentes-pc/processadores/amd/ryzen-5/5600x/ryzen-5-5600_NoIndex_True#applied_filter_id%3DMODEL%26applied_filter_name%3DModelo%26applied_filter_order%3D3%26applied_value_id%3D9352145%26applied_value_name%3D5600X%26applied_value_order%3D4%26applied_value_results%3D21%26is_custom%3Dfalse"
    ;;
  7600)
    url="https://lista.mercadolivre.com.br/informatica/componentes-pc/processadores/ryzen-5-7600_NoIndex_True#applied_filter_id%3Dcategory%26applied_filter_name%3DCategorias%26applied_filter_order%3D3%26applied_value_id%3DMLB1693%26applied_value_name%3DProcessadores%26applied_value_order%3D2%26applied_value_results%3D71%26is_custom%3Dfalse"
    ;;
  5700)
    url="https://lista.mercadolivre.com.br/ryzen-7-5700x3d"
    ;;
  5800)
    url="https://lista.mercadolivre.com.br/informatica/componentes-pc/processadores/amd/ryzen-7/5800x3d/ryzen-7-5800x3d_NoIndex_True#applied_filter_id%3DMODEL%26applied_filter_name%3DModelo%26applied_filter_order%3D3%26applied_value_id%3D15265052%26applied_value_name%3D5800X3D%26applied_value_order%3D11%26applied_value_results%3D14%26is_custom%3Dfalse"
    ;;
  7800)
    url="https://lista.mercadolivre.com.br/informatica/componentes-pc/processadores/amd/ryzen-7/7800x3d/ryzen-7-7800x3d_NoIndex_True#applied_filter_id%3DMODEL%26applied_filter_name%3DModelo%26applied_filter_order%3D3%26applied_value_id%3D18535896%26applied_value_name%3D7800X3D%26applied_value_order%3D13%26applied_value_results%3D3%26is_custom%3Dfalse"
    ;;
  7900)
    url="https://lista.mercadolivre.com.br/informatica/componentes-pc/processadores/amd/ryzen-9/ryzen-9-7900x3d_NoIndex_True#applied_filter_id%3DLINE%26applied_filter_name%3DLinha%26applied_filter_order%3D4%26applied_value_id%3D7650894%26applied_value_name%3DRyzen+9%26applied_value_order%3D7%26applied_value_results%3D77%26is_custom%3Dfalse"
    ;;
  *)
    echo "Parâmetro inválido."
    exit 1
    ;;
esac

user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

curl -A "$user_agent" -b cookies.txt -L "$url" -o index.html
