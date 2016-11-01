#!/bin/bash 
cd ../ECAN      
rm -r *
cp -r ../ecanGenerator/dist/* .
gitaj $@