
  CREATE OR REPLACE FUNCTION public.get_models(
    _manufacture_year integer,
    _model_name text)
      RETURNS TABLE("mmCode" integer, "makeName" character varying, "modelName" character varying, "seriesName" character varying, wscore real, score real, "seriesScore" real)
      LANGUAGE 'sql'
      COST 100
      VOLATILE
      ROWS 1000
  AS $BODY$
      set pg_trgm.similarity_threshold = 0.2;
      set pg_trgm.word_similarity_threshold = 0.4;
      select distinct "mmCode",
          "makeName",
          ("makeName" || ' ' || "modelName") as "modelName",
          "seriesName",
          (_model_name <->> ("makeName" || ' ' || "modelName") ) as wscore,
          (_model_name <-> ("makeName" || ' ' || "modelName")) as score,
          (_model_name <->> "seriesName") as "seriesScore"
         from "VehicleModel"
         where ("discontinuedDate" < "introductionDate"
                or _manufacture_year<=extract(year from "discontinuedDate"))
         and _manufacture_year>=extract(year from "introductionDate")
         and (_model_name % ("makeName" || ' ' || "modelName")
          or replace(_model_name, "makeName", '') % "seriesName")
         order by wscore asc, score desc, "modelName" asc, "seriesScore" asc;
  $BODY$;
  grant SELECT on ALL tables in schema public to "${env.rds.mmdata.DB_R_USER}";
  grant EXECUTE on ALL functions in schema public to "${env.rds.mmdata.DB_R_USER}";

