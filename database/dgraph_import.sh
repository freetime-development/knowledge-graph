#!/bin/bash

container_name=${container_name:-alpha1}
data_file=${data_file:-/dgraph/to_load/g01.rdf.gz}
schema_file=${schema_file:-/dgraph/to_load/g01.schema.gz}

while [ $# -gt 0 ]; do

   if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare $param="$2"
   fi

  shift
done

if [ ! -d ./server1/to_load ]; then
    mkdir ./server1/to_load
fi

cp ${data_file/\/dgraph\//} server1/to_load/ && cp ${schema_file/\/dgraph\//} server1/to_load/

docker exec -it $container_name dgraph bulk -f $data_file -s $schema_file --map_shards=1 --reduce_shards=1 --http localhost:8001 --zero=zero:5080 
docker exec -it $container_name rm -rf /dgraph/p
docker exec -it $container_name mv /dgraph/out/0/p /dgraph/p
docker exec -it $container_name rm -rf /dgraph/out

rm server1/to_load/g01*
