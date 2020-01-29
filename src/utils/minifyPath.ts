import { stringifyViewBox } from "./setViewBox";
import SVGO from "svgo";

type Options = {
  floatPrecision?: number;
};

export const minifyPath = async (d: string, options: Options = {}) => {
  const boxString = stringifyViewBox({ x: 0, y: 0, width: 1, height: 1 });
  const fragments = [`<svg view-box="${boxString}"><path d="`, d, `"/></svg>`];
  const html = fragments.join("");

  const svgo = new SVGO({
    full: true,
    plugins: [
      {
        convertPathData: {
          applyTransforms: true,
          applyTransformsStroked: true,
          makeArcs: {
            threshold: 2.5, // coefficient of rounding error
            tolerance: 0.5 // percentage of radius
          },
          straightCurves: true,
          lineShorthands: true,
          curveSmoothShorthands: true,
          floatPrecision: 3,
          transformPrecision: 5,
          removeUseless: true,
          collapseRepeated: true,
          utilizeAbsolute: true,
          leadingZero: true,
          negativeExtraSpace: true,
          noSpaceAfterFlags: true,
          forceAbsolutePath: false,
          ...options
        }
      },
      { cleanupAttrs: false },
      { removeDoctype: false },
      { removeXMLProcInst: false },
      { removeComments: false },
      { removeMetadata: false },
      { removeTitle: false },
      { removeDesc: false },
      { removeUselessDefs: false },
      { removeEditorsNSData: false },
      { removeEmptyAttrs: false },
      { removeHiddenElems: false },
      { removeEmptyText: false },
      { removeEmptyContainers: false },
      { removeViewBox: false },
      { cleanupEnableBackground: false },
      { convertStyleToAttrs: false },
      { convertColors: false },
      { convertTransform: false },
      { removeUnknownsAndDefaults: false },
      { removeNonInheritableGroupAttrs: false },
      { removeUselessStrokeAndFill: false },
      { removeUnusedNS: false },
      { cleanupIDs: false },
      { cleanupNumericValues: false },
      { moveElemsAttrsToGroup: false },
      { moveGroupAttrsToElems: false },
      { collapseGroups: false },
      { removeRasterImages: false },
      { mergePaths: false },
      { convertShapeToPath: false },
      { sortAttrs: false },
      { removeDimensions: false },
      { removeAttrs: false }
    ]
  });

  const { data } = await svgo.optimize(html);

  return data.replace(fragments[0], "").replace(fragments[2], "");
};
