#!/usr/bin/env bash
set -e

host=${1:-"db"}
port=${2:-5432}
user=${3:-${POSTGRES_USER:-postgres}}
db=${4:-${POSTGRES_DB:-nex_task_dev}}

echo "Waiting for Postgres at ${host}:${port}..."
until pg_isready -h "$host" -p "$port" -U "$user" -d "$db" >/dev/null 2>&1; do
  sleep 1
done

echo "Postgres is ready"
